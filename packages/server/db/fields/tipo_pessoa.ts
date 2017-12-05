module.exports = {
  type: String,
  required: [true, 'Por favor, informe se é pessoa física/jurídica!'],
  validate: {
    validator: (tipo: string) => /(fisica|juridica)/i.test(tipo),
    message: 'Pessoa deve ser apenas física ou jurídica!',
  },
};
