module.exports = {
  type: require('mongoose').Schema.Types.ObjectId,
  ref: 'Cliente',
  required: [true, 'O cliente deve ser especificado'],
};
