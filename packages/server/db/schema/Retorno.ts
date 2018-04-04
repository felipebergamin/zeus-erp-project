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

  criadoEm: {
    default: Date.now,
    type: Date,
  },
});
