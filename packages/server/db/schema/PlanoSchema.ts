import { Schema } from 'mongoose';

export = new Schema({
  alterado_em: require('../fields/alterado_em'),
  criado_em: require('../fields/criado_em'),

  descricao: require('../fields/descricao'),
  nome: require('../fields/nome_plano'),
  valor_mensal: require('../fields/valor_boleto'),
  velocidade_download: require('../fields/velocidade_download'),
  velocidade_upload: require('../fields/velocidade_upload'),
});
