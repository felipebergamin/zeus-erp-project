import { Schema } from "mongoose";
import { plugin } from "../plugins/generate-protocol";

const schema = new Schema({
  cancelada: {
    default: false,
    type: Boolean,
  },
  dataHoraCancelada: Date,
  motivoCancelamento: String,
  observacoesAtendente: String,

  concluida: {
    default: false,
    type: Boolean,
  },
  dataAgenda: {
    required: [true, 'Qual a data da instalação?'],
    type: Date,
  },
  dataHoraConclusao: Date,

  cliente: {
    ref: 'Cliente',
    required: [true, 'A instalação deve ter um cliente associado!'],
    type: Schema.Types.ObjectId,
  },
  pontoAcesso: {
    ref: 'Cliente.pontosDeAcesso',
    required: true,
    type: Schema.Types.ObjectId,
  },
  protocolo: {
    type: String,
    unique: [true, "Erro ao gerar protocolo, o protocolo não é único!"],
  },
  tecnicoResponsavel: {
    ref: 'Usuario',
    required: [true, 'Um técnico deve ser designado para a intalação!'],
    type: Schema.Types.ObjectId,
  },

  cobrado: {
    default: true,
    type: Boolean,
  },
  dataPagamento: Date,
  modoPagamento: {
    enum: [ null, 'cartao', 'dinheiro', 'cheque' ],
    type: String,
  },
  observacoesPagamento: String,
  pago: {
    default: false,
    type: Boolean,
  },
  recebidoPor: {
    ref: 'Usuario',
    type: Schema.Types.ObjectId,
  },
  valor: Number,

  alteradoEm: require('../fields/alterado_em'),
  criadoEm: require('../fields/criado_em'),
});

schema.plugin(plugin, { opid: "1" });

export = schema;
