import { Schema } from 'mongoose';

export = new Schema({
  agencia: new Schema({
    digito: {
      required: [true, 'O dígito da agência deve ser informado'],
      type: String,
    },
    numero: {
      required: [true, 'O número da agência deve ser informado'],
      type: String,
    },
  }),
  carteira: {
    required: [true, 'A carteira deve ser especificada'],
    type: String,
  },
  cedente: {
    required: [true, 'Informe o cedente'],
    type: String,
  },
  codigo_cedente: {
    required: [true, 'Informe o código do cedente'],
    type: String,
  },
  conta: new Schema({
    digito: {
      required: [true, 'O dígito da conta deve ser informado'],
      type: String,
    },
    numero: {
      required: [true, 'O número da conta deve ser informado'],
      type: Number,
    },
  }),
  multaDia: {
    required: [true, 'Informe a multa aplicada por dia de atraso'],
    type: Number,
  },
  multaVencimento: {
    required: [true, 'Informe a multa aplicada por atraso'],
    type: Number,
  },
  nome: {
    required: [true, 'Um nome deve ser definido'],
    type: String,
  },
  nossoNumero: {
    required: [true, 'Este campo é obrigatório'],
    type: Number,
  },
  proximaRemessa: {
    default: 0,
    type: Number,
  },

  alterado_em: require('../fields/alterado_em'),
  criado_em: require('../fields/criado_em'),
  excluido_em: require('../fields/excluido_em'),
});
