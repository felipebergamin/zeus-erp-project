import mongoose = require('../connection');

export = {
  ref: 'ContaBancaria',
  required: [true, 'Especifique a conta bancária'],
  type: mongoose.Schema.Types.ObjectId,
};
