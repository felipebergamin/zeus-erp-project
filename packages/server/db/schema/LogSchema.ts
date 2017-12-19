import { Schema } from "mongoose";

export = new Schema({
  dataHora: {
    required: true,
    type: Date,
  },
  level: {
    required: true,
    type: String,
  },
  objectToken: {
    type: Schema.Types.ObjectId,
  },
  texto: {
    required: true,
    type: String,
  },
  usuario: {
    ref: 'Usuario',
    required: true,
    type: Schema.Types.ObjectId,
  },
});
