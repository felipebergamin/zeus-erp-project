import { Schema } from 'mongoose';

export = new Schema({
  cliente: {
    ref: 'Cliente',
    required: [true, 'Um carnê deve ter um cliente associado'],
    type: Schema.Types.ObjectId,
  },
  descricao: {
    required: [true, 'Uma descrição é obrigatória'],
    type: String,
  },

  alterado_em: require('../fields/alterado_em'),
  criado_em: require('../fields/criado_em'),
  excluido_em: require('../fields/excluido_em'),
});
