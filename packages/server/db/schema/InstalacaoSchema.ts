import { Schema } from "../connection";

export = new Schema({
  cliente: {
    ref: 'Cliente',
    required: [true, 'A instalação deve ter um cliente associado!'],
    type: Schema.Types.ObjectId,
  },
  data_agenda: {
    required: [true, 'Qual a data da instalação?'],
    type: Date,
  },
  data_finalizada: Date,
  tecnico_responsavel: {
    ref: 'Tecnico',
    required: [true, 'Um técnico deve ser designado para a intalação!'],
    type: Schema.Types.ObjectId,
  },

  alterado_em: require('../fields/alterado_em'),
  criado_em: require('../fields/criado_em'),
  excluido_em: require('../fields/excluido_em'),
});
