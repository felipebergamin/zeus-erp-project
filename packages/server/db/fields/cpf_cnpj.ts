import setCpf = require('../setters/setCPF');
import { validateCPF } from "../validators/validateCPF";

export = {
  required: [true, 'CPF/CNPJ não informado!'],
  set: setCpf,
  type: String,
  unique: [true, 'CPF/CNPJ já existente!'],
  validate: {
    message: 'CPF/CNPJ inválido!',
    validator: validateCPF,
  },
};
