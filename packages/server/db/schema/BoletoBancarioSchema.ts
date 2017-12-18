import mongoose = require('../connection');
const Schema = mongoose.Schema;

import autoIncrement = require('../plugins/auto-increment');

autoIncrement.initialize(mongoose.connection);

const BoletoSchema = new Schema({
  alterado_em: require('../fields/alterado_em'),
  carne: {
    ref: 'Carne',
    type: Schema.Types.ObjectId,
  },
  cliente: require('../fields/cliente'),
  contaBancaria: require('../fields/conta_bancaria'),
  criado_em: require('../fields/criado_em'),
  dataPagamento: require('../fields/data_pagamento'),
  dataVencimento: require('../fields/data_vencimento'),
  enviadoRemessa: require('../fields/enviado_remessa'),
  excluido_em: require('../fields/excluido_em'),
  pago: {
    default: false,
    type: Boolean,
  },
  valorCobranca: require('../fields/valor_boleto'),
  valorPago: Number,
});

BoletoSchema.plugin(autoIncrement.plugin, { model: 'BoletoBancario', field: 'numeroBoleto', startAt: 1 });
export = BoletoSchema;
