const { Schema } = require('mongoose');

module.exports = new Schema({
    nome: require('../fields/nome_plano'),
    descricao: require('../fields/descricao'),
    criado_em: require('../fields/criado_em'),
    alterado_em: require('../fields/alterado_em'),

    velocidade_upload: require('../fields/velocidade_upload'),
    velocidade_download: require('../fields/velocidade_download')
});