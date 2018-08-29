import { Promise } from 'bluebird';
import * as Debug from 'debug';
import { EventEmitter } from 'events';
import * as fs from 'fs';
import moment = require("moment");
import { posix } from 'path';
import * as readline from 'readline';

import db from '../../models';
import { ArquivoRetornoAttributes } from '../../models/ArquivoRetornoModel';
import { BoletoInstance } from "../../models/BoletoModel";
import { OcorrenciaBancariaAttributes, OcorrenciaBancariaInstance } from '../../models/OcorrenciaBancariaModel';
import { throwError } from '../../util/utils';

const debug = Debug('zeus:cnab:retorno');

interface TraillerRetorno {
  qtdeRegistrosConfirmados: number;
  valorRegistrosConfirmados: number;
  valorRegistrosLiquidados: number;
  qtdeRegistrosLiquidados: number;
  valorRegistros06: number;
  qtdeRegistrosBaixados: number;
  valorRegistrosBaixados: number;
  qtdeRegistrosVencimentoAlterado: number;
  valorRegistrosVencimentoAlterado: number;
}

interface HeaderRetorno {
  dataArquivo: Date;
}

export class Retorno extends EventEmitter {

  public async parseFile(filePath: string, contaBancaria: number) {
    debug('Retorno::parseFile %s', JSON.stringify({ filePath, contaBancaria }));
    throwError(!fs.existsSync(filePath), `O caminho para o arquivo de retorno é inválido: ${filePath}`);

    const nomeArquivo = posix.basename(filePath);

    const conta = await db.ContaBancaria.findById(contaBancaria);
    throwError(!conta, `Conta bancária ${contaBancaria} não encontrada!`);

    const fileAlreadySubmitted = await db.ArquivoRetorno.findOne({ where: { nomeArquivo, contaBancaria } });
    const arquivoProcessado: ArquivoRetornoAttributes = {
      contaBancaria,
      nomeArquivo,
      processado: false,
      quantidadeOperacoes: 0,
    };
    const ocorrencias: OcorrenciaBancariaInstance[] = [];
    const boletos: BoletoInstance[] = [];
    const applyChanges = (!fileAlreadySubmitted || (fileAlreadySubmitted && !fileAlreadySubmitted.get('processado')));

    readline.createInterface({
      input: fs.createReadStream(filePath),
    })
      .on('line', async (line: string) => {
        debug(line);

        // toma ações diferentes de acordo com o tipo de registro da linha atual
        switch (line.charAt(0)) {
          case '0': // registro header
            debug('Lendo registro header');
            const header = this.parseHeader(line);
            arquivoProcessado.dataGravacao = header.dataArquivo;
            break;
          case '1': // registro de transação
            debug('Lendo registro de transação');
            const ocorrencia = db.OcorrenciaBancaria.build(this.parseTransaction(line));
            ocorrencia.set('dataHora', new Date());
            arquivoProcessado.quantidadeOperacoes++;

            const boleto = !isNaN(ocorrencia.get('boleto')) ? await db.Boleto.findById(ocorrencia.get('boleto')) : null;
            if (fileAlreadySubmitted) { ocorrencia.set('arquivoRetorno', fileAlreadySubmitted.get('_id')); }

            if (boleto) {
              ocorrencia.set('boleto', boleto.get('_id'));

              debug('Boleto correspondente a ocorrencia encontrado!');

              if (applyChanges === true) {
                boletos.push(boleto);
                debug('Aplicando alterações ao boleto');
                const boletoProcessado = await this.aplicarOcorrenciaAoBoleto(ocorrencia, boleto);
                db.Boleto.update(boletoProcessado.toJSON(), { where: { _id: boletoProcessado.get('_id') } });
              }
            }

            ocorrencias.push(ocorrencia);
            break;
          case '9': // registro trailler
            debug('Lendo registro trailler');
            Object.assign(arquivoProcessado, this.parseTrailler(line));
            break;
        }
      })
      .on('close', () => {
        /*
        * se a opção de aplicar mudanças é true
        * E o arquivo já foi enviado mas não processado OU não foi enviado
        * então abre uma transação para salvar o retorno no banco de dados
        */
        if (applyChanges) {
          debug('Aplicando mudanças no banco de dados');

          db.sequelize.transaction((transaction) => {

            arquivoProcessado.processado = true;
            return db.ArquivoRetorno.create(arquivoProcessado, { transaction })
              .then((arquivo) => {
                debug('Arquivo Retorno Salvo no BD');
                const boletoPromises = [];

                boletos.forEach((boleto) => {
                  debug(JSON.stringify(boleto.toJSON(), null, 2));
                  boletoPromises.push(boleto.save({ transaction }));
                });

                if (boletoPromises.length === 0) {
                  boletoPromises.push(Promise.resolve());
                }

                return Promise.all(boletoPromises)
                  .then(() => {
                    debug('boletos criados');
                    const ocorrenciasPromises = [];

                    for (const ocorrencia of ocorrencias) {
                      debug('Salvando ocorrencia');
                      debug(JSON.stringify(ocorrencia));
                      ocorrencia.set('arquivoRetorno', arquivo.get('_id'));
                      ocorrenciasPromises.push(ocorrencia.save({ transaction }));
                    }

                    return Promise.all(ocorrenciasPromises);
                  });
              });
          })
          .then((result) => {
            this.emit('done', result);
            return result;
          })
          .catch((err) => {
            this.emit('error', err);
            throw err;
          });

        } else {
          debug('Mudanças não serão aplicadas no banco de dados');
          this.emit('done', ocorrencias);
        }
      });
  }

  private aplicarOcorrenciaAoBoleto(registroTransacao: OcorrenciaBancariaInstance, boleto: BoletoInstance): BoletoInstance {

    switch (registroTransacao.get('idOcorrencia')) {
      case '02': // Entrada confirmada
        boleto.set('registrado', true);
        break;
      case '06': // Liquidação normal (título pago)
        boleto.set('pago', true);
        boleto.set('dataCredito', registroTransacao.get('dataCredito'));
        boleto.set('dataPagamento', registroTransacao.get('dataOcorrenciaNoBanco'));
        break;
      case '09': // Baixado automático via arquivo
      case '10': // Baixado conforme instruções da agência
        boleto.set('baixado', true);
        boleto.set('dataBaixa', registroTransacao.get('dataOcorrenciaNoBanco'));
        break;
      case '17': // Liquidação após baixa ou Título não registrado
        if (!boleto.get('pago')) {
          boleto.set('pago', true);
          boleto.set('dataPagamento', registroTransacao.get('dataOcorrenciaNoBanco'));
          boleto.set('dataCredito', registroTransacao.get('dataCredito'));
        }
        break;
      case '14': // Vencimento Alterado
        boleto.set('enviarAtualizacaoVencimento', false);
        break;
      case '33':
        boleto.set('enviarAtualizacaoValor', false);
        boleto.set('enviarAtualizacaoVencimento', false);
        break;
    }

    return boleto;
  }

  // tslint:disable:object-literal-sort-keys
  private parseHeader(headerStr: string): HeaderRetorno {
    return {
      dataArquivo: moment(headerStr.substr(94, 6), 'DDMMYY').toDate(),
    };
  }

  private parseTransaction(line: string): OcorrenciaBancariaAttributes {
    debug(`parseTransaction: Tamanho da Linha: ${line.length}`);

    if (line.length !== 400) {
      throw new Error(`Linha com tamanho inválido: ${line.length} caracteres`);
    }

    const dataCredito = moment(line.substr(295, 6), 'DDMMYY');

    return {
      idOcorrencia: line.substr(108, 2),
      dataOcorrenciaNoBanco: moment(line.substr(110, 6), 'DDMMYY').toDate(),
      bancoCobrador: line.substr(165, 3),
      agenciaCobradora: line.substr(168, 5),
      valorPago: Number(line.substr(253, 13)) / 100,
      jurosMora: Number(line.substr(266, 13)) / 100,
      dataCredito: dataCredito.isValid() ? dataCredito.toDate() : null,
      motivosOcorrencia: line.substr(294, 1),

      boleto: (parseInt(line.substr(37, 25).trim(), 10) || null),
    };
  }

  private parseTrailler(line: string): TraillerRetorno {
    return {
      valorRegistrosConfirmados: parseInt(line.substr(62, 12), 10) / 100,
      qtdeRegistrosConfirmados: parseInt(line.substr(57, 5), 10),

      valorRegistrosLiquidados: parseInt(line.substr(74, 12), 10) / 100,
      qtdeRegistrosLiquidados: parseInt(line.substr(86, 5), 10),
      valorRegistros06: parseInt(line.substr(91, 12), 10) / 100,

      qtdeRegistrosBaixados: parseInt(line.substr(103, 5), 10),
      valorRegistrosBaixados: parseInt(line.substr(108, 12), 10) / 100,

      qtdeRegistrosVencimentoAlterado: parseInt(line.substr(137, 5), 10),
      valorRegistrosVencimentoAlterado: parseInt(line.substr(142, 12), 10) / 100,
    };
  }
}
