import { Schema } from "../connection";

export = new Schema({
  ip: {
    required: [true, "O IP da OLT deve ser informado"],
    type: String,
  },
  login: String,
  nome: {
    required: [true, "Um nome é obrigatório"],
    type: String,
  },
  obs: String,
  passwd: String,

  alteradoEm: require("../fields/alterado_em"),
  criadoEm: require("../fields/criado_em"),
});
