import { Schema } from 'mongoose';

import { isValidEmail } from '../validators/isValidEmail';
import { isValidIPAddress } from '../validators/isValidIPAddress';

export = new Schema({
  autoAtrelarMac: {
    default: false,
    type: Boolean,
  },
  ipAddress: {
    type: String,
    validate: {
      message: "O endereço IP é inválido!",
      validator: isValidIPAddress,
    },
  },
  login: {
    required: [true, 'O login do cliente não foi definido!'],
    type: String,
    unique: [true, 'Este login já existe no sistema!'],
    validate: {
      message: 'O login tem um formato inválido!',
      validator: isValidEmail,
    },
  },
  macAddress: String,
  macOnu: String,
  olt: {
    ref: "OLT",
    type: Schema.Types.ObjectId,
  },
  passwd: {
    required: [true, 'Por favor, informe a senha PPPoE!'],
    type: String,
  },
  ponNo: Number,
  slotNo: Number,

  incluirNaCobranca: {
    default: true,
    type: Boolean,
  },
  plano: {
    ref: 'Plano',
    required: [true, 'Plano de assinatura não definido!'],
    type: Schema.Types.ObjectId,
  },

  /* informações de endereço */
  endereco: require('./Endereco'),
});
