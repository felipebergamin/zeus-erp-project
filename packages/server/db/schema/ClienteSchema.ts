import { Schema } from "../connection";

const schema = new Schema({
  /* informações pessoa */
  alterado_em: require('../fields/alterado_em'),
  cpf_cnpj: require('../fields/cpf_cnpj'),
  criado_em: require('../fields/criado_em'),
  data_nascimento: require('../fields/data_nascimento'),
  excluido_em: require('../fields/excluido_em'),
  nome: require('../fields/nome_pessoa'),
  rg_ie: require('../fields/rg_ie'),
  tags: [String],
  tipo_pessoa: require('../fields/tipo_pessoa'),

  /* informações de contato */
  email: require('../fields/email'),
  numero_celular: require('../fields/numero_celular'),
  telefone_fixo: require('../fields/telefone_fixo'),

  /* informações de conexão */
  auto_atrelar_mac: require('../fields/auto_atrelar_mac'),
  ip_address: require('../fields/ip_address'),
  login: require('../fields/login'),
  mac_address: String,
  mac_onu: String,
  olt: String,
  passwd: require('../fields/passwd'),
  pon_no: Number,
  slot_no: Number,

  plano: require('../fields/plano'),

  /* informações de endereço */
  endereco_residencial: require('./Endereco'),

  endereco_correspondencia: require('./Endereco'),

  /* informações financeiras */
  auto_bloquear: require('../fields/auto_bloquear'),
  conta_bancaria: require('../fields/conta_bancaria'),
  dia_vencimento: {
    required: [true, 'O dia de vencimento deve ser informado'],
    type: Number,
  },
  observacoes: String,

});

schema.index({ nome: "text" });

export = schema;
