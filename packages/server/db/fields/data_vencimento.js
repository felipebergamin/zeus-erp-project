module.exports = {
  type: Date,
  required: [true, 'Data de vencimento do boleto não informada!'],
  validate: {
    validator: require('../validators/isFutureDate'),
    message: 'O vencimento do boleto deve ser uma data no futuro!',
  },
};
