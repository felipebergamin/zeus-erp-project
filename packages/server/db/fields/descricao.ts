export = {
  required: [true, 'Uma descrição é necessária!'],
  type: String,
  validate: [
    {
      message: 'Descricao vazia!',
      validator: (desc: string) => desc.length > 0,
    },
    {
      message: 'O máximo permitido é 140 caracteres!',
      validator: (desc: string) => desc.length <= 140,
    },
  ],
};
