import { Schema } from 'mongoose';

export = new Schema({
  contaBancaria: {
    ref: "ContaBancaria",
    type: Schema.Types.ObjectId,
  },
  conteudoArquivo: {
    required: true,
    type: String,
  },
  diaGeracao: {
    required: true,
    type: Number,
  },
  mesGeracao: {
    required: true,
    type: Number,
  },
  nome: {
    required: true,
    type: String,
  },
  quantidadeOperacoes: {
    required: true,
    type: Number,
  },

  criadoEm: {
    default: Date.now,
    type: Date,
  },
});
