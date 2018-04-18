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
  dataGravacao: {
    required: true,
    type: Date,
  },
  nomeArquivo: {
    required: true,
    type: String,
  },
  processado: Boolean,
  quantidadeOperacoes: {
    required: true,
    type: Number,
  },

  criadoEm: {
    default: Date.now,
    type: Date,
  },
});
