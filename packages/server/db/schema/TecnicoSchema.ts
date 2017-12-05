import { Schema } from 'mongoose';

export = new Schema({
  nome: require('../fields/nome_pessoa'),
  observacoes: String,
  telegram_id: require('../fields/telegram_id'),
  criado_em: require('../fields/criado_em'),
  alterado_em: require('../fields/alterado_em'),
});
