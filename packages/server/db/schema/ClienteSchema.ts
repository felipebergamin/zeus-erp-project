import { Schema } from "../connection";

const schema = new Schema({
  alteradoEm: require('../fields/alterado_em'),
  criadoEm: require('../fields/criado_em'),
  excluidoEm: require('../fields/excluido_em'),

  excluido: {
    default: false,
    type: Boolean,
  },

  /* informações pessoa */
  cpfCnpj: require('../fields/cpf_cnpj'),
  dataNascimento: require('../fields/data_nascimento'),
  nome: require('../fields/nome_pessoa'),
  rgIe: require('../fields/rg_ie'),
  tags: [String],
  tipoPessoa: require('../fields/tipo_pessoa'),

  /* informações de contato */
  email: require('../fields/email'),
  numeroCelular: require('../fields/numero_celular'),
  telefoneFixo: require('../fields/telefone_fixo'),

  /* informações de conexão */
  autoAtrelarMac: require('../fields/auto_atrelar_mac'),
  ipAddress: require('../fields/ip_address'),
  login: require('../fields/login'),
  macAddress: String,
  macOnu: String,
  olt: {
    ref: "OLT",
    type: Schema.Types.ObjectId,
  },
  passwd: require('../fields/passwd'),
  ponNo: Number,
  slotNo: Number,

  plano: require('../fields/plano'),

  /* informações de endereço */
  enderecoResidencial: require('./Endereco'),

  enderecoCorrespondencia: require('./Endereco'),

  /* informações financeiras */
  autoBloquear: require('../fields/auto_bloquear'),
  contaBancaria: require('../fields/conta_bancaria'),
  diaVencimento: {
    required: [true, 'O dia de vencimento deve ser informado'],
    type: Number,
  },
  observacoes: String,

});

schema.index({ nome: "text" });

export = schema;
