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
  descricaoOcorrencia: {
    required: true,
    type: String,
  },
  motivoOcorrencia: {
    required: true,
    type: String,
  },
  ocorrencia: {
    required: true,
    type: Number,
  },
}, { _id: false });

const BoletoSchema = new Schema({
  alteradoEm: require('../fields/alterado_em'),
  criadoEm: require('../fields/criado_em'),
  excluidoEm: require('../fields/excluido_em'),

  carne: {
    ref: 'Carne',
    type: Schema.Types.ObjectId,
  },
  cliente: require('../fields/cliente'),
  contaBancaria: require('../fields/conta_bancaria'),

  dataBaixa: Date,
  dataPagamento: require('../fields/data_pagamento'),
  dataVencimento: require('../fields/data_vencimento'),
  valorCobranca: require('../fields/valor_boleto'),
  valorPago: Number,

  digitoNossoNumero: String,
  nossoNumero: Number,
  ocorrencias: [ocorrenciaSchema],

  /* informações de status do boleto */
  baixado: {
    default: false,
    type: Boolean,
  },
  excluido: {
    default: false,
    type: Boolean,
  },
  pago: {
    default: false,
    type: Boolean,
  },
  registrado: {
    default: false,
    type: Boolean,
  },

  enviarAtualizacaoValor: Boolean,
  enviarAtualizacaoVencimento: Boolean,
  enviarPedidoBaixa: Boolean,
});

db.then((mongoclient: typeof mongoose) => {
  autoIncrement.initialize(mongoclient.connection);
  BoletoSchema.plugin(autoIncrement.plugin, { model: 'BoletoBancario', field: 'numeroBoleto', startAt: 1 });
  BoletoSchema.plugin(genNossoNumeroPlugin.plugin);
});
export = BoletoSchema;
