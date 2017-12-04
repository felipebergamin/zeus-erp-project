module.exports = {
  type: String,
  required: [true, 'Informe o CEP! Por favor!'],
  set: cep => cep.replace('-', ''),
  validate: {
    validator: require('../validators/cep'),
    message: 'O CEP não parece válido!',
  },
};
