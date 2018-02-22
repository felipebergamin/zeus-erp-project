import { Schema } from "mongoose";

export = new Schema({
  cidr: {
    required: [true, "Informe o pool a ser usado"],
    type: [String],
  },
  nome: {
    required: [true, "O nome é obrigatório"],
    type: String,
  },
});
