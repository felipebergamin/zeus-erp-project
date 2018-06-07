import { Schema } from 'mongoose';

export = new Schema({
  nome: {
    required: [true, 'Um nome para o esquema é necessário'],
    type: String,
  },
  observacao: {
    type: String,
  },
  quantidadeInicial: {
    default: 0,
    type: Number,
  },
  quantidadeMinima: {
    default: 0,
    type: Number,
  },
  unidadeMedida: {
    required: [true, 'Uma unidade de medida é necessária'],
    type: String,
  },
});
