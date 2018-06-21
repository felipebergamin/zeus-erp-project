import { Schema } from 'mongoose';

export = new Schema({
  descricao: {
    required: [ true, "Uma descrição deve ser informada" ],
    type: String,
  },
  geraCobranca: {
    required: [ true, "O campo é obrigatório" ],
    type: Boolean,
  },
  valorCobrado: {
    default: 0,
    type: Number,
  },
});
