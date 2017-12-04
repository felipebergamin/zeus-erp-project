const { Schema } = require('mongoose');

module.exports = new Schema({
  /* informações pessoa */
  cpf_cnpj: require('../fields/cpf_cnpj'),
  criado_em: require('../fields/criado_em'),
  alterado_em: require('../fields/alterado_em'),
  excluido_em: require('../fields/excluido_em'),
  data_nascimento: require('../fields/data_nascimento'),
  nome: require('../fields/nome_pessoa'),
  rg_ie: require('../fields/rg_ie'),
  tags: [String],
  tipo_pessoa: require('../fields/tipo_pessoa'),

  /* informações de contato */
  numero_celular: require('../fields/numero_celular'),
  email: require('../fields/email'),
  telefone_fixo: require('../fields/telefone_fixo'),

  /* informações de conexão */
  ip_address: require('../fields/ip_address'),
  login: require('../fields/login'),
  passwd: require('../fields/passwd'),
  mac_address: String,
  auto_atrelar_mac: require('../fields/auto_atrelar_mac'),
  mac_onu: String,
  olt: String,
  pon_no: Number,
  slot_no: Number,

  plano: require('../fields/plano'),

  /* informações de endereço */
  endereco_residencial: require('./Endereco'),

  endereco_correspondencia: require('./Endereco'),

  /* informações financeiras */
  dia_vencimento: require('../fields/dia_vencimento'),
  auto_bloquear: require('../fields/auto_bloquear'),
  // conta_boletos: ContaBancaria,
  observacoes: String,

});
