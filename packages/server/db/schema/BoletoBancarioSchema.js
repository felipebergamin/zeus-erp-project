const { Schema, connection } = require('mongoose');
const autoIncrement = require('../plugins/auto-increment');

autoIncrement.initialize(connection);

const BoletoSchema = new Schema({
  valorCobranca: require('../fields/valor_boleto'),
  valorPago: Number,
  dataVencimento: require('../fields/data_vencimento'),
  dataPagamento: require('../fields/data_pagamento'),
  criadoEm: require('../fields/criado_em'),
  alteradoEm: require('../fields/alterado_em'),
  excluidoEm: require('../fields/excluido_em'),
  descricao: require('../fields/descricao'),
  contaBancaria: require('../fields/conta_bancaria'),
  enviadoRemessa: require('../fields/enviado_remessa'),
  cliente: require('../fields/cliente'),
});

BoletoSchema.plugin(autoIncrement.plugin, { model: 'BoletoBancario', field: 'numeroBoleto', startAt: 1 });
module.exports = BoletoSchema;
