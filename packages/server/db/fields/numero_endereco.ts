export = {
  required: [true, 'Por favor, informe um número!'],
  type: String,
  validate: {
    message: 'O número não é válido!',
    validator: require('../validators/numeroEndereco'),
  },
};
