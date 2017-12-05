module.exports = {
  type: String,
  required: [true, 'Por favor, informe um número!'],
  validate: {
    validator: require('../validators/numeroEndereco'),
    message: 'O número não é válido!',
  },
};
