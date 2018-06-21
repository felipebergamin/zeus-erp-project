import { Schema } from "mongoose";
import { plugin as generateProtocolPlugin } from "../plugins/generate-protocol";

const schema = new Schema({
  alteradoEm: require("../fields/alterado_em"),
  criadoEm: require("../fields/criado_em"),

  cancelado: {
    default: false,
    type: Boolean,
  },
  canceladoEm: {
    type: Date,
  },
  canceladoPor: {
    ref: "Usuario",
    type: Schema.Types.ObjectId,
  },
  motivoCancelamento: {
    type: String,
  },

  finalizado: {
    default: false,
    type: Boolean,
  },
  finalizadoEm: {
    type: Date,
  },
  imagemAssinatura: {
    type: String,
  },
  observacoesTecnico: {
    type: String,
  },
  problema: {
    ref: 'ProblemaChamado',
    type: Schema.Types.ObjectId,
  },

  boletoCobranca: {
    ref: "BoletoBancario",
    type: Schema.Types.ObjectId,
  },
  formaPagamento: {
    enum: [ null, 'cheque', 'dinheiro', 'cartao', 'boleto' ],
    type: String,
  },
  /* se o chamado deveria ser cobrado de acordo com as regras da empresa */
  geraCobranca: {
    type: Boolean,
  },
  /* isentar a cobrança mesmo se o chamado deveria ter sido cobrado */
  isentarCobranca: {
    type: Boolean,
  },
  valorACobrar: {
    type: Number,
  },

  abertoPor: {
    ref: "Usuario",
    required: [true, "É obrigatório informar quem abriu o chamado"],
    type: Schema.Types.ObjectId,
  },
  mensagem: {
    required: [true, "Informe a mensagem do chamado"],
    type: String,
  },
  motivoAbertura: {
    required: [true, "Qual o motivo do chamado?"],
    type: String,
  },

  cliente: {
    ref: "Cliente",
    required: [true, "O cliente deve ser especificado"],
    type: Schema.Types.ObjectId,
  },
  pontoAcesso: {
    ref: "Cliente.pontosDeAcesso",
    required: [ true, "O ponto de acesso deve ser informado" ],
    type: Schema.Types.ObjectId,
  },

  prioridade: {
    default: 'normal',
    enum: [
      'baixa',
      'normal',
      'alta',
      'critica',
    ],
    type: String,
  },
  protocolo: {
    type: String,
  },
  tecnico: {
    ref: "Usuario",
    type: Schema.Types.ObjectId,
  },
});

schema.plugin(generateProtocolPlugin, { opid: "2" });
export = schema;
