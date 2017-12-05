import { Schema } from 'mongoose';

export = new Schema({
  nome: {
    type: String,
    required: [true, 'Um nome deve ser definido'],
  },
  cedente: {
    type: String,
    required: [true, 'Informe o cedente'],
  },
  codigo_cedente: {
    type: String,
    required: [true, 'Informe o código do cedente'],
  },
  agencia: new Schema({
    numero: {
      type: Number,
      required: [true, 'O número da agência deve ser informado'],
    },
    digito: {
      type: Number,
      required: [true, 'O dígito da agência deve ser informado'],
    },
  }),
  conta: new Schema({
    numero: {
      type: Number,
      required: [true, 'O número da conta deve ser informado'],
    },
    digito: {
      type: String,
      required: [true, 'O dígito da conta deve ser informado'],
    },
  }),
  carteira: {
    type: String,
    required: [true, 'A carteira deve ser especificada'],
  },
  nossoNumero: {
    type: Number,
    required: [true, 'Este campo é obrigatório'],
  },
  multaVencimento: {
    type: Number,
    required: [true, 'Informe a multa aplicada por atraso'],
  },
  multaDia: {
    type: Number,
    required: [true, 'Informe a multa aplicada por dia de atraso'],
  },
  proximaRemessa: {
    type: Number,
    default: 0,
  },

  criado_em: require('../fields/criado_em'),
  alterado_em: require('../fields/alterado_em'),
  excluido_em: require('../fields/excluido_em'),
});
