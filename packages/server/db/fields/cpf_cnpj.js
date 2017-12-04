const validateCpf = require('../validators/validateCPF');
const setCpf = require('../setters/setCPF');

module.exports = {
  type: String,
  required: [true, 'CPF/CNPJ não informado!'],
  unique: [true, 'CPF/CNPJ já existente!'],
  set: setCpf,
  validate: {
    validator: validateCpf,
    message: 'CPF/CNPJ inválido!',
  },
};
