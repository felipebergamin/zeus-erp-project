const mongoose = require('mongoose');

module.exports = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'ContaBancaria',
  required: [true, 'Especifique a conta bancária'],
};
