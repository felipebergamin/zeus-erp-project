export = {
  required: [true, 'Informe o CEP! Por favor!'],
  set: (cep: string) => cep.replace('-', ''),
  type: String,
  validate: {
    message: 'O CEP não parece válido!',
    validator: require('../validators/cep'),
  },
};
