const regexValidate = require('../validators/email');

module.exports = {
  type: String,
  set: email => email.trim().toLowerCase(),
  validate: {
    validator: regexValidate,
    message: 'Por favor, informe um e-mail válido!',
  },
};
