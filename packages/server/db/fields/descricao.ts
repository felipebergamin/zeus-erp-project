module.exports = {
  type: String,
  required: [true, 'Uma descrição é necessária!'],
  validate: [
    {
      validator: (desc: string) => desc.length > 0,
      message: 'Descricao vazia!',
    },
    {
      validator: (desc: string) => desc.length <= 140,
      message: 'O máximo permitido é 140 caracteres!',
    },
  ],
};
