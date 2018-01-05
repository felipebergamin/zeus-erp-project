export = {
  required: [true, 'O login do cliente não foi definido!'],
  type: String,
  unique: [true, 'Este login já existe no sistema!'],
  validate: {
    message: 'O login tem um formato inválido!',
    validator: require('../validators/email'),
  },
};
