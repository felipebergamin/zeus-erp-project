import mongoose = require('../connection');
const Schema = mongoose.Schema;

import autoIncrement = require('../plugins/auto-increment');

autoIncrement.initialize(mongoose.connection);

const BoletoSchema = new Schema({
  alteradoEm: require('../fields/alterado_em'),
  cliente: require('../fields/cliente'),
  contaBancaria: require('../fields/conta_bancaria'),
  criadoEm: require('../fields/criado_em'),
  dataPagamento: require('../fields/data_pagamento'),
  dataVencimento: require('../fields/data_vencimento'),
  enviadoRemessa: require('../fields/enviado_remessa'),
  excluidoEm: require('../fields/excluido_em'),
  valorCobranca: require('../fields/valor_boleto'),
  valorPago: Number,
});

BoletoSchema.plugin(autoIncrement.plugin, { model: 'BoletoBancario', field: 'numeroBoleto', startAt: 1 });
export = BoletoSchema;
