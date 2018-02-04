import { Schema } from "../connection";
import { plugin } from "../plugins/generate-carne-id";

const schema = new Schema({
  cliente: {
    ref: 'Cliente',
    required: [true, 'Um carnê deve ter um cliente associado'],
    type: Schema.Types.ObjectId,
  },
  descricao: {
    required: [true, 'Uma descrição é obrigatória'],
    type: String,
  },
  excluido: {
    default: false,
    type: Boolean,
  },
  idCarne: {
    type: String,
    unique: true,
  },

  alteradoEm: require('../fields/alterado_em'),
  criadoEm: require('../fields/criado_em'),
  excluidoEm: require('../fields/excluido_em'),
});

schema.plugin(plugin);
export = schema;
