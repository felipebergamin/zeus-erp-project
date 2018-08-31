import * as Debug from 'debug';
import moment = require("moment");
import { Op } from 'sequelize';

import db from '../../models';
import { ArquivoRemessaAttributes, ArquivoRemessaInstance } from "../../models/ArquivoRemessaModel";
import { BoletoInstance } from "../../models/BoletoModel";
import { ContaBancariaInstance } from "../../models/ContaBancariaModel";
import { throwError } from "../../util/utils";

const debug = Debug('zeus:cnab');

export interface RemessaOptions {
  dataInicio?: Date;
  dataFim?: Date;
  cliente?: string;
  enviarPedidoBaixa?: boolean;
  enviarAtualizacaoValor?: boolean;
  enviarAtualizacaoVencimento?: boolean;
  reenviarRemetidos?: boolean;
}

function* counter() {
  let index = 1;

  while (true) {
    yield index++;
  }
}

export class Remessa {
  /** armazena as linhas do arquivo */
  private stringData: string[];
  /** generator que gera o número de cada linha */
  private contadorRegistros: IterableIterator<number>;

  public async generate(contaBancaria: ContaBancariaInstance, options: RemessaOptions = {}): Promise<ArquivoRemessaInstance> {
    throwError(!contaBancaria, `Conta bancária inexistente`);

    debug('Gerando nova remessa para conta bancaria %d %s', contaBancaria.get('_id'), contaBancaria.get('nome'));
    debug('Options', JSON.stringify(options));

    this.stringData = [];
    this.contadorRegistros = counter();

    const remessa = {} as ArquivoRemessaAttributes;
    remessa.diaGeracao = moment().date();
    remessa.mesGeracao = moment().month();
    remessa.contaBancaria = contaBancaria.get('_id');
    remessa.quantidadeOperacoes = 0;

    // monta a query para buscar no banco de dados os boletos que devem ser enviados no arquivo
    const where = {} as any;

    const normalizeBoolean = (val: any): boolean => val === true;

    where.lock = false;
    where.contaBancaria = contaBancaria.get('_id');

    // se boletos já enviados não devem ser reenviados
    if (!options.reenviarRemetidos) {
      // então seleciona boletos não registrados
      where.registrado = false;
    }
    // inclui ou não atualizações de valor
    where.enviarAtualizacaoValor = normalizeBoolean(options.enviarAtualizacaoValor);
    // inclui ou não atualizações de vencimento
    where.enviarAtualizacaoVencimento = normalizeBoolean(options.enviarAtualizacaoVencimento);
    // inclui ou não pedidos de baixa
    where.enviarPedidoBaixa = normalizeBoolean(options.enviarPedidoBaixa);

    // se o intervalo de datas a ser enviada na remessa foi definida
    if (("dataInicio" in options && moment(options.dataInicio).isValid())
      && ("dataFim" in options && moment(options.dataFim).isValid())) {

      debug('Intervalo de datas especificado, definindo a query');
      where.dataVencimento = {
        [Op.gte]: moment(options.dataInicio).toDate(),
        [Op.lte]: moment(options.dataFim).toDate(),
      };
    }

    // se devem ser enviados boletos de um único cliente, adiciona na query
    if ("cliente" in options) {
      debug('Enviar apenas boletos do cliente', options.cliente);
      if (!isNaN(parseInt(options.cliente, 10))) {
        where.cliente = options.cliente;
      } else if (!!options.cliente) {
        throw new Error(`ID do cliente é inválido`);
      }
    }

    debug('Where', JSON.stringify(where));

    // busca no banco os boletos passando a query montada
    const todosBoletos = await db.Boleto.findAll({ where });

    // se não há boletos com os critérios selecionados
    throwError(todosBoletos.length === 0, 'Não há boletos para enviar');

    const promises = [];

    todosBoletos.forEach((boleto: BoletoInstance) => {
      debug('Processando boleto %d', boleto.get('_id'));
      // se o boleto nunca foi enviado para registro
      if (!boleto.get('registrado')) {
        // add o boleto para registro
        debug('%d enviado para registro', boleto.get('_id'));
        promises.push(this.gerarPedidoRegistro(boleto));
      } else {
        // se o boleto precisa atualizar valor e o usuario permitiu atualizacao de valor
        if (boleto.get('enviarAtualizacaoValor')) {
          // add o boleto para atualizacao de valor
          debug('%d enviado para atualização de valor', boleto.get('_id'));
          promises.push(this.gerarAtualizacaoValor(boleto));
        }

        // se o boleto precisa de uma atualizacao de vencimento e o usuario permitiu essa operacao
        if (boleto.get('enviarAtualizacaoVencimento')) {
          // add o boleto para atualizacao de vencimento
          debug('%d enviado para atualização de vencimento', boleto.get('_id'));
          promises.push(this.gerarAtualizacaoVencimento(boleto));
        }

        // se precisa enviar um pedido de baixa do boleto e essa operacao foi permitida
        if (boleto.get('enviarPedidoBaixa')) {
          // add o boleto para pedido de baixa
          debug('%d enviado para baixa', boleto.get('_id'));
          promises.push(this.gerarPedidoBaixa(boleto));
        }
      }

      remessa.quantidadeOperacoes++;
      boleto.set('lock', true);
    });

    this.stringData.push(this.createHeaderLabel(contaBancaria));

    for await (const line of promises) {
      this.stringData.push(line);
    }

    this.stringData.push(this.generateTrail());
    remessa.conteudoArquivo = this.getFileContent();
    remessa.nomeArquivo = await this.generateFileName(remessa.diaGeracao, remessa.mesGeracao);
    debug('Nome do Arquivo: %s', remessa.nomeArquivo);
    debug('Quantidade de Operações %s', remessa.quantidadeOperacoes);

    return await db.sequelize.transaction((transaction) => {
      debug('Salvando alterações nos boletos');
      return Promise.all(todosBoletos.map((boleto) => boleto.save({ transaction })))
        .then((boletosSalvos) => {
          debug('Boletos salvos, incrementando a contagem da remessa');
          return contaBancaria.increment('proximaRemessa', { transaction });
        }).then((cb) => {
          debug('Contagem de remessas incrementada, salvando arquivo e finalizando');
          return db.ArquivoRemessa.create(remessa, { transaction });
        });
    });
  }

  private async generateFileName(diaGeracao: number, mesGeracao: number): Promise<string> {
    const previousFiles = await db.ArquivoRemessa.count({ where: { diaGeracao, mesGeracao } });
    debug('generateFileName - %d já foram gerados hoje', previousFiles);

    mesGeracao += 1;

    let fileName = 'CB';
    fileName += diaGeracao.toString().padStart(2, "0");
    fileName += mesGeracao.toString().padStart(2, "0");

    if (previousFiles === 0) {
      return `${fileName}.REM`;
    }

    const filename = `${fileName}${previousFiles.toString().padStart(2, "0")}.REM`;
    debug('generateFileName - Nome do Arquivo: %s', filename);
    return filename;
  }

  private createHeaderLabel(contaBancaria: ContaBancariaInstance): string {
    debug('::createHeaderLabel');
    let line = '';

    // 001 a 0026
    line += "01REMESSA01COBRANCA       ";
    // 027 a 046 - codigo da empresa
    line += contaBancaria.get('codigoCedente').padStart(20, "0");
    // 047 a 076 - nome da empresa
    line += contaBancaria.get('cedente').padEnd(30, " ");
    // 077 a 079 - numero do bradesco
    line += "237";
    // 080 a 094 - nome do banco
    line += "BRADESCO".padEnd(15, " ");
    // 095 a 100 - data de gravacao do arquivo
    line += moment().format("DDMMYY");
    // 101 a 108 - branco
    line += " ".repeat(8);
    // 109 a 110 - identificacao do sistema
    line += "MX";
    // 111 a 117 - numero sequencial de remessa
    line += contaBancaria.get('proximaRemessa').toString().padStart(7, "0");
    // 118 a 394 - brancos
    line += "".padStart(277, " ");
    // 395 a 400 - número sequencial
    line += this.contadorRegistros.next().value.toString().padStart(6, "0");

    throwError(this.stringData.length !== 0, 'Erro no processamento da remessa! O registro header label não foi o primeiro a ser processado');
    throwError(line.length !== 400, `Erro no processamento da remessa! O registro header label tem ${line.length} posições (deve ter 400)`);

    debug(line);
    return line;
  }

  private async gerarPedidoRegistro(boleto: BoletoInstance): Promise<string> {
    debug('::enviaRegistroBoleto', boleto.get('_id'));
    return await this.registro01(boleto, '01');
  }

  private async gerarPedidoBaixa(boleto: BoletoInstance): Promise<string> {
    debug('::enviaPedidoBaixa', boleto.get('_id'));
    return await this.registro01(boleto, '02');
  }

  private async gerarAtualizacaoVencimento(boleto: BoletoInstance): Promise<string> {
    debug('::enviaAtualizacaoVencimento', boleto.get('_id'));
    return await this.registro01(boleto, '06');
  }

  private async gerarAtualizacaoValor(boleto: BoletoInstance): Promise<string> {
    debug('::enviaAtualizacaoValor', boleto.get('_id'));
    return await this.registro01(boleto, '20');
  }

  /**
   * Recebe um objeto boleto converte para um registro de cobrança (Tipo 1)
   * @param boleto boleto a ser adicionado
   * @param ocorrencia ocorrência para o boleto com dois dígitos
   */
  private async registro01(boleto: BoletoInstance, ocorrencia: string): Promise<string> {
    debug('::addRegistro01 ocorrencia %d boleto %d', ocorrencia, boleto.get('_id'));
    const contaBancaria = await db.ContaBancaria.findById(boleto.get('contaBancaria'));
    const cliente = await db.Cliente.findById(boleto.get('cliente'));
    let line = "";

    // 001 a 001 - id registro
    line += "1";
    // 002 a 020 - informações débito automático
    line += "".padEnd(19, " ");
    // 021 - zero
    line += "0";
    // 22 a 24 - codigo da carteira
    line += contaBancaria.get('carteira').padStart(3, "0");
    // 25 a 29 - código da agencia beneficiario sem digito
    line += contaBancaria.get('numeroAgencia').padStart(5, "0");
    // 30 a 36 - conta corrente
    line += contaBancaria.get('numeroConta').toString().padStart(7, "0");
    // 37 - digito da conta
    line += contaBancaria.get('digitoConta');
    // 38 a 62 - numero de controle do participante
    line += `${boleto.get('_id')}`.padEnd(25, " ");
    // 63 a 65 - código do banco débito automático
    line += "000";
    // 66 - campo de multa
    line += "2";
    // 67 a 70 - percentual multa
    line += contaBancaria.get('multaVencimento').toFixed(2).replace(".", "").padStart(4, "0");
    // 71 a 81 - nosso número
    line += boleto.get('nossoNumero').toString().padStart(11, "0");
    // 82 - dígito conferência nosso número
    line += boleto.get('digitoNossoNumero');
    // 83 a 92 - desconto bonificação por dia
    line += "".padStart(10, "0");
    // 93 - condicao para emissao da papeleta de cobranca
    line += "2";
    // 94 - emite boleto para debito automatico
    line += "N";
    // 95 a 104 - id da operacao no banco
    line += " ".repeat(10);
    // 105 - indicador de rateio de credito
    line += " ";
    // 106 - enderecamento para aviso de debito automatico
    line += "2";
    // 107 a 108 - quantidades possiveis de pagamento
    line += "  ";
    // 109 a 110 - ocorrencia
    line += ocorrencia.padStart(2, "0");
    // 111 a 120 - número do documento
    line += boleto.get('_id').toString().padStart(10, "0");
    // 121 a 126 - data vencimento do titulo
    line += moment(boleto.get('dataVencimento')).format("DDMMYY");
    // 127 a 139 - valor do titulo
    line += boleto.get('valorCobranca').toFixed(2).replace(".", "").padStart(13, "0");
    // 140 a 142 - banco encarregado da cobranca
    line += "000";
    // 143 a 147 - agencia depositaria
    line += "00000";
    // 148 a 149 -especie de titulo
    line += "01";
    // 150 - identificao
    line += "N";
    // 151 a 156 - data da emissao
    line += moment(boleto.get('createdAt')).format("DDMMYY");
    // 157 a 158 - 1 instrucao
    line += "00";
    // 159 a 160 - 2 instrucao
    line += "00";
    // 161 a 173 - valor a ser cobrado por dia de atraso
    line += this.calcularMultaPorDia(contaBancaria.get('multaDia'), boleto.get('valorCobranca'))
      .toFixed(2)
      .replace(".", "")
      .padStart(13, "0");

    // 174 a 179 - data limite para concessao de desconto
    line += "000000";
    // 180 a 192 - valor do desconto
    line += "0000000000000";
    // 193 a 205 - valor do iof
    line += "0000000000000";
    // 206 a 218 - valor do abatimento a ser concedido ou cancelado
    line += "0000000000000";
    // 219 a 220 - identificacao do tipo de inscricao do pagador
    line += (cliente.get('tipoPessoa') === 'fisica' ? '01' : '02');
    // 221 a 234 - numero de inscricao do pagador
    line += cliente.get('cpfCnpj').padStart(14, "0");
    // 235 a 274 - nome do pagador
    line += cliente.get('nome').toUpperCase().padEnd(40, " ");
    // 275 a 314 - endereco completo
    line += `${cliente.get('logradouro')} ${cliente.get('numero')}`
      .padEnd(40, " ");
    // 315 a 326 - primeira mensagem
    line += " ".repeat(12);
    // 327 a 334 - cep
    line += cliente.get('cep').replace("-", "");
    // 335 a 394 - sacador avalista ou segunda mensagem
    line += " ".repeat(60);
    // 395 a 400 - numero sequencial do registro
    line += this.contadorRegistros.next().value.toString().padStart(6, "0");

    debug(line);
    throwError(line.length !== 400, `Erro ao gerar remessa: boleto ${boleto.get('_id')} gerou uma linha inválida com ${line.length} posições`);
    return line;
  }

  private generateTrail(): string {
    debug('::generateTrail');

    let line = "";

    // 1 - identificacao de registro
    line += "9";
    // 2 a 394 - brancos
    line += " ".repeat(393);
    // 395 a 400 - numero sequencial do registro
    line += this.contadorRegistros.next().value.toString().padStart(6, "0");

    throwError(line.length !== 400, `Erro ao gerar remessa: Registro Trailler gerou uma linha inválida com ${line.length} posições`);
    debug(line);
    return line;
  }

  private getFileContent(): string {
    debug('::getFileContent');
    debug('Arquivo com %d linhas', this.stringData.length);

    return this.stringData.join("\n");
  }

  private calcularMultaPorDia(percentualMulta: number, valorTitulo: number): number {
    return valorTitulo + valorTitulo * (percentualMulta / 100);
  }
}
