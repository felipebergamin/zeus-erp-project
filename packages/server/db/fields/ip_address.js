module.exports = {
  type: String,
  validate: {
    validator: require('../validators/ipAddress'),
    message: 'O endereço IP é inválido!',
  },
};
