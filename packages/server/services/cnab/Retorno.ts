import moment = require("moment");
import { inspect } from "util";

import { IArquivoRetorno } from "../../interfaces/IArquivoRetorno";
import { IBoletoBancario } from "../../interfaces/IBoletoBancario";
import { IHeaderLabelRetorno } from "../../interfaces/IHeaderLabelRetorno";
import { ITraillerRetorno } from "../../interfaces/ITraillerRetorno";
import { ITransactionRetorno } from "../../interfaces/ITransactionRetorno";
import { RepositoryBoleto } from "../repository/repository-boleto";
import { DicionarioMotivosOcorrencias } from './DicionarioMotivosOcorrencias';
import { DicionarioOcorrencias } from './DicionarioOcorrencias';

export class Retorno {
  public header: IHeaderLabelRetorno;
  public transactions: ITransactionRetorno[];
  public trailler: ITraillerRetorno;

  constructor(
    private repoBoleto: RepositoryBoleto,
  ) { }

  public async parseFileContent(fileContent: string, applyChanges: boolean): Promise<IArquivoRetorno> {
    const retorno = {
      registros: [],
    } as IArquivoRetorno;

    this.header = null;
    this.transactions = [];
    this.trailler = null;

    const lines = fileContent.split('\n');

    // itera as linhas do arquivo
    while (lines.length > 0) {
      const line = lines.shift().trim();

      // toma ações diferentes de acordo com o tipo de registro da linha atual
      switch (line.charAt(0)) {
        case '0': // registro header
          this.header = this.parseHeader(line);
          retorno.dataGravacao = moment(this.header.dataArquivo, 'DDMMYY').toDate();
          break;
        case '1': // registro de transação
          const registro = this.parseTransaction(line);

          registro.descricaoOcorrencia =
            this.getDescritivoOcorrencia(registro.idOcorrencia);
          registro.descricaoMotivoOcorrencia =
            this.getDescritivoMotivoOcorrencia(registro.idOcorrencia, registro.motivoOcorrencia);

          // se o título foi gerado pelo Zeus
          if (registro.numeroControle.startsWith('Z')) {
            const id = registro.numeroControle.replace('Z', '');
            const boleto = await this.repoBoleto.get(id, { populate: 'cliente' });

            if (boleto) {
              registro.boleto = boleto;

              if (applyChanges === true) {
                const boletoProcessado = this.aplicarOcorrenciaAoBoleto(registro, boleto);
                this.repoBoleto.update(boletoProcessado._id, boletoProcessado);
              }
            } else { // o boleto não foi encontrado
              registro.erro = true;
              registro.descricaoErro = 'Título não encontrado';
            }
          } else { // o título não foi gerado pelo Zeus
            registro.erro = true;
            registro.descricaoErro = 'Título não pertence ao sistema Zeus';
          }

          retorno.registros.push(registro);
          break;
        case '9': // registro trailler
          retorno.trailler = this.parseTrailler(line);
          break;
      }
    }

    return retorno;
  }

  /**
   * Retorna um novo objeto BoletoBancario modificado de acordo com
   * a transação do arquivo retorno. Não modifica o objeto Boleto passado por parâmetro
   *
   * @param registroTransacao registro do arquivo de retorno a ser processado
   * @param b boleto tratado pela transacao
   * @returns Um novo objeto BoletoBancario com as devidas alterações do arquivo retorno
   */
  private aplicarOcorrenciaAoBoleto(registroTransacao: ITransactionRetorno, boleto: IBoletoBancario): IBoletoBancario {
    // armazena informações sobre a ocorrência
    const dataHora = new Date();
    const ocorrencia = registroTransacao.idOcorrencia;
    const descricaoOcorrencia =
      this.getDescritivoOcorrencia(ocorrencia);
    const motivoOcorrencia =
      this.getDescritivoMotivoOcorrencia(ocorrencia, registroTransacao.motivoOcorrencia);

    if (Array.isArray(boleto.ocorrencias)) {
      boleto.ocorrencias.push({
        dataHora,
        descricaoOcorrencia,
        motivoOcorrencia,
        ocorrencia,
      });
    } else {
      boleto.ocorrencias = [
        {
          dataHora,
          descricaoOcorrencia,
          motivoOcorrencia,
          ocorrencia,
        },
      ];
    }

    switch (registroTransacao.idOcorrencia) {
      case '02': // Entrada confirmada
        boleto.registrado = true;
        break;
      case '06': // Liquidação normal (título pago)
        boleto.pago = true;
        boleto.dataPagamento = moment(registroTransacao.dataOcorrencia, "DDMMYY").toDate();
        break;
      case '09': // Baixado automático via arquivo
      case '10': // Baixado conforme instruções da agência
        boleto.baixado = true;
        boleto.dataBaixa = moment(registroTransacao.dataOcorrencia, "DDMMYY").toDate();
        break;
      case '17': // Liquidação após baixa ou Título não registrado
        if (boleto.pago) {
          registroTransacao.erro = true;
          registroTransacao.descricaoErro = 'Título pago mais de uma vez';
        } else {
          boleto.pago = true;
          boleto.dataPagamento = moment(registroTransacao.dataOcorrencia, "DDMMYY").toDate();
        }
        break;
      case '14': // Vencimento Alterado
        boleto.enviarAtualizacaoVencimento = false;
        break;
      case '33':
        boleto.enviarAtualizacaoValor = false;
        boleto.enviarAtualizacaoVencimento = false;
        break;
    }

    return boleto;
  }

  private getDescritivoOcorrencia(ocorrencia: string): string {
    return DicionarioOcorrencias[ocorrencia] || '';
  }

  private getDescritivoMotivoOcorrencia(ocorrencia: string, motivo: string) {
    return DicionarioMotivosOcorrencias[ocorrencia][motivo] || '';
  }

  private validateFileContent(fileContent: string): boolean {
    const lines = fileContent.split('\n');

    if (lines.length < 2) {
      return false;
    }

    return lines.every((line: string) => line.trim().length === 400 || line.trim().length === 0);
  }

  // tslint:disable:object-literal-sort-keys
  private parseHeader(headerStr: string): IHeaderLabelRetorno {
    return {
      idRegistro: headerStr.substr(0, 1),
      idRetorno: headerStr.substr(1, 2),
      literalRetorno: headerStr.substr(2, 7),
      codigoServico: headerStr.substr(9, 2),
      literalServico: headerStr.substr(11, 15),
      codigoEmpresa: headerStr.substr(26, 20),
      nomeEmpresa: headerStr.substr(46, 30),
      numeroBradesco: headerStr.substr(76, 3),
      nomeBanco: headerStr.substr(79, 15),
      dataArquivo: headerStr.substr(94, 6),
      densidadeGravacao: headerStr.substr(100, 8),
      numeroAvisoBancario: headerStr.substr(108, 5),
      dataCredito: headerStr.substr(379, 6),
      sequenciaRegistro: +headerStr.substr(394, 6),
    };
  }

  private parseTransaction(line: string): ITransactionRetorno {
    return {
      idRegistro: line.substr(0, 1),
      tipoInscricaoEmpresa: line.substr(1, 2),
      numeroInscricao: line.substr(3, 14),
      idEmpresaBeneficiaria: line.substr(20, 17),
      numeroControle: line.substr(37, 25),
      idTitulo: line.substr(70, 12),
      idRateio: line.substr(104, 1),
      pagamentoParcial: line.substr(105, 2),
      carteira: line.substr(107, 1),
      idOcorrencia: line.substr(108, 2),
      dataOcorrencia: moment(line.substr(110, 6), 'DDMMYY').toDate(),
      numeroDocumento: line.substr(116, 10),
      idTituloBanco: line.substr(126, 20),
      vencimentoTitulo: moment(line.substr(146, 6), 'DDMMYY').toDate(),
      valorTitulo: Number(line.substr(152, 13)) / 100,
      bancoCobrador: line.substr(165, 3),
      agenciaCobradora: line.substr(168, 5),
      despesaCobranca: Number(line.substr(175, 13)) / 100,
      outrasDespesas: Number(line.substr(188, 13)) / 100,
      jurosAtraso: Number(line.substr(201, 13)) / 100,
      iof: Number(line.substr(214, 13)),
      abatimento: Number(line.substr(227, 13)) / 100,
      descontoConcedido: Number(line.substr(240, 13)) / 100,
      valorPago: Number(line.substr(253, 13)) / 100,
      jurosMora: Number(line.substr(266, 13)) / 100,
      outrosCreditos: Number(line.substr(279, 13)) / 100,
      motivoOcorrencia: line.substr(294, 1),
      dataCredito: moment(line.substr(295, 6), 'DDMMYY').toDate(),
      origemPagamento: line.substr(301, 3),
      chequeBradesco: line.substr(314, 4),
      motivoRejeicao: line.substr(318, 10),
      numeroCartorio: line.substr(368, 2),
      numeroProtocolo: line.substr(370, 10),
      sequenciaRegistro: +line.substr(394, 6),
    };
  }

  private parseTrailler(line: string): ITraillerRetorno {
    return {
      idRegistro: line.substr(0, 1),
      idRetorno: line.substr(1, 1),
      tipoRegistro: line.substr(2, 2),
      codigoBanco: line.substr(4, 3),
      quantidadeTitulos: line.substr(17, 8),
      valorTotal: line.substr(25, 14),
      numeroAvisoBancario: line.substr(39, 8),
      quantidadeRegistros02: line.substr(57, 5),
      valorRegistros02: line.substr(62, 12),
      valorRegistros06: line.substr(74, 12),
      quantidadeRegistros06: line.substr(86, 5),
      valorRegistros: line.substr(91, 12),
      quantidadeRegistrosBaixados: line.substr(103, 5),
      valorRegistrosBaixados: line.substr(108, 12),
      quantidadeRegistrosAbatimentoCancelado: line.substr(120, 5),
      valorRegistrosAbatimentoCancelado: line.substr(125, 12),
      quantidadeRegistrosVencimentoAlterado: line.substr(137, 5),
      valorRegistrosVencimentoAlterado: line.substr(142, 12),
      quantidadeRegistrosAbatimento: line.substr(154, 5),
      valorRegistrosAbatimento: line.substr(159, 12),
      quantidadeRegistrosConfirmacaoProtesto: line.substr(171, 5),
      valorRegistrosConfirmacaoProtesto: line.substr(176, 12),
      valorTotalRateios: line.substr(362, 15),
      quantidadeRateios: line.substr(377, 8),
      sequenciaRegistro: line.substr(394, 6),
    };
  }
}
