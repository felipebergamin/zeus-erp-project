const { Schema } = require('mongoose');

module.exports = new Schema({
  data_agenda: {
    type: Date,
    required: [true, 'Qual a data da instalação?'],
  },
  data_finalizada: Date,
  tecnico_responsavel: {
    type: Schema.Types.ObjectId,
    ref: 'Tecnico',
    required: [true, 'Um técnico deve ser designado para a intalação!'],
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Cliente',
    required: [true, 'A instalação deve ter um cliente associado!'],
  },
  criado_em: require('../fields/criado_em'),
  alterado_em: require('../fields/alterado_em'),
  excluido_em: require('../fields/excluido_em'),
});
