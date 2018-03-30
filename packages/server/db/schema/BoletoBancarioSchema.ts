import mongoose = require("mongoose");
const { Schema } = mongoose;

import db = require("../connection");
import autoIncrement = require('../plugins/auto-increment');
import genNossoNumeroPlugin = require("../plugins/nosso-numero-boleto");

const ocorrenciaSchema = new Schema({
  dataHora: {
    default: Date.now,
    type: Date,
  },
  ocorrencia: {
    required: true,
    type: Number,
  },
}, { _id: false });

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
  digitoNossoNumero: {
    type: String,
  },
  enviadoRemessa: require('../fields/enviado_remessa'),
  enviarAtualizacaoValor: Boolean,
  enviarAtualizacaoVencimento: Boolean,
  enviarPedidoBaixa: Boolean,
  excluido: {
    default: false,
    type: Boolean,
  },
  excluidoEm: require('../fields/excluido_em'),
  nossoNumero: {
    type: Number,
  },
  ocorrencias: [ocorrenciaSchema],
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
  BoletoSchema.plugin(genNossoNumeroPlugin.plugin);
});
export = BoletoSchema;
