export = {
  required: [true, 'Por favor, informe se é pessoa física/jurídica!'],
  type: String,
  validate: {
    message: 'Pessoa deve ser apenas física ou jurídica!',
    validator: (tipo: string) => /(fisica|juridica)/i.test(tipo),
  },
};
