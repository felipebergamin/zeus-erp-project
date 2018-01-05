export = {
  required: [true, "O nome deve ser informado!"],
  type: String,
  validate: {
    message: "Nome inválido!",
    validator: (nome: string) => nome.trim().split(" ").length > 0,
  },
};
