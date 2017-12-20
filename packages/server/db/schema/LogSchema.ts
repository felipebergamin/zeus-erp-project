import { Schema } from "mongoose";

const schema = new Schema({
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

schema.index({ texto: "text" });
schema.index({ dataHora: -1 });

export = schema;
