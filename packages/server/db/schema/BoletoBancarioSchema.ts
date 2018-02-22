import mongoose = require("mongoose");
const { Schema } = mongoose;

import db = require("../connection");
import autoIncrement = require('../plugins/auto-increment');

const BoletoSchema = new Schema({
  alteradoEm: require('../fields/alterado_em'),
  carne: {
    ref: 'Carne',
    type: Schema.Types.ObjectId,
  },
  cliente: require('../fields/cliente'),
  contaBancaria: require('../fields/conta_bancaria'),
  criadoEm: require('../fields/criado_em'),
  dataPagamento: require('../fields/data_pagamento'),
  dataVencimento: require('../fields/data_vencimento'),
  enviadoRemessa: require('../fields/enviado_remessa'),
  excluido: {
    default: false,
    type: Boolean,
  },
  excluidoEm: require('../fields/excluido_em'),
  ocorrencias: [Number],
  pago: {
    default: false,
    type: Boolean,
  },
  valorCobranca: require('../fields/valor_boleto'),
  valorPago: Number,
});

db.then((mongoclient: typeof mongoose) => {
  autoIncrement.initialize(mongoclient.connection);
  BoletoSchema.plugin(autoIncrement.plugin, { model: 'BoletoBancario', field: 'numeroBoleto', startAt: 1 });
});
export = BoletoSchema;
