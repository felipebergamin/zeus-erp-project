const { ObjectId } = require('mongoose').Schema.Types;

module.exports = {
  type: ObjectId,
  ref: 'Plano',
  required: [true, 'Plano de assinatura não definido!'],
};
