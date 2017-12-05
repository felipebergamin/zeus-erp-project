module.exports = {
  type: String,
  required: [true, 'O nome deve ser informado!'],
  validate: {
    validator: (nome: string) => nome.trim().split(' ').length > 0,
    message: 'Nome inválido!',
  },
};
