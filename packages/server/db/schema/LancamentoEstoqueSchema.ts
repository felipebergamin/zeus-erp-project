import { Schema } from 'mongoose';

export = new Schema({
  criadoEm: {
    default: Date.now,
    type: Date,
  },
  criadoPor: {
    required: [true, 'O responsável pelo lançamento deve ser informado'],
    type: Schema.Types.ObjectId,
  },

  itens: [new Schema({
    item: {
      ref: 'ItemEstoque',
      required: [true, 'Um item do estoque deve ser informado'],
      type: Schema.Types.ObjectId,
    },
    quantidade: {
      required: [true, 'A quantidade deve ser informada'],
      type: Number,
    },
  })],
});
