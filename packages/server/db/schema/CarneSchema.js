const { Schema } = require('mongoose');

module.exports = new Schema({
  boletos: {
    type: [Schema.Types.ObjectId],
    ref: 'BoletoBancario',
    required: [true, 'Um carnê deve conter boletos'],
  },
  descricao: {
    type: String,
    required: [true, 'Uma descrição é obrigatória'],
  },
  criadoEm: require('../fields/criado_em'),
  alteradoEm: require('../fields/alterado_em'),
  excluidoEm: require('../fields/excluido_em'),
});
