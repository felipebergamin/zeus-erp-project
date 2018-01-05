import { Schema } from 'mongoose';

export = new Schema({
  alterado_em: require('../fields/alterado_em'),
  criado_em: require('../fields/criado_em'),

  nome: require('../fields/nome_pessoa'),
  observacoes: String,
  telegram_id: require('../fields/telegram_id'),
});
