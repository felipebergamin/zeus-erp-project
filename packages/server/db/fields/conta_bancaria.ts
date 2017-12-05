import mongoose = require('../connection');

module.exports = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'ContaBancaria',
  required: [true, 'Especifique a conta bancária'],
};
