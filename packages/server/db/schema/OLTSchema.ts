import { Schema } from "mongoose";

export = new Schema({
  ip: {
    required: [true, "O IP da OLT deve ser informado"],
    type: String,
  },
  nome: {
    required: [true, "Um nome é obrigatório"],
    type: String,
  },
  obs: String,

  alteradoEm: require("../fields/alterado_em"),
  criadoEm: require("../fields/criado_em"),
});
