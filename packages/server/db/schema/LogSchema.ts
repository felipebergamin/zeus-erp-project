import { Schema } from "mongoose";

const schema = new Schema({
  dataHora: {
    default: Date.now,
    type: Date,
  },
  level: {
    required: true,
    type: String,
  },
  objectToken: {
    type: Schema.Types.ObjectId,
  },
  systemOutput: {
    type: String,
  },
  texto: {
    type: String,
  },
  usuario: {
    ref: 'Usuario',
    type: Schema.Types.ObjectId,
  },
});

schema.index({ texto: "text" });
schema.index({ dataHora: -1 });

export = schema;
