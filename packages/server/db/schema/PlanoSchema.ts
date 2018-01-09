import { Schema } from 'mongoose';

export = new Schema({
  alteradoEm: require('../fields/alterado_em'),
  criadoEm: require('../fields/criado_em'),

  descricao: require('../fields/descricao'),
  nome: require('../fields/nome_plano'),
  valorMensal: require('../fields/valor_boleto'),
  velocidadeDownload: require('../fields/velocidade_download'),
  velocidadeUpload: require('../fields/velocidade_upload'),
});
