export = {
  ref: 'Cliente',
  required: [true, 'O cliente deve ser especificado'],
  type: require('mongoose').Schema.Types.ObjectId,
};
