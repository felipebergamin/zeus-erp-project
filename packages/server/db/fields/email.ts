import regexValidate = require('../validators/isValidEmail');

export = {
  set: (email: string) => email.trim().toLowerCase(),
  type: String,
  validate: {
    message: 'Por favor, informe um e-mail válido!',
    validator: regexValidate,
  },
};
