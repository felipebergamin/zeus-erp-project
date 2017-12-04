const { Schema } = require('mongoose');

module.exports = new Schema({
  logradouro: require('../fields/logradouro'),
  numero: require('../fields/numero_endereco'),
  cep: require('../fields/cep'),
  bairro: require('../fields/bairro'),
  cidade: require('../fields/cidade'),
  estado: require('../fields/estado'),
  complemento: String,
  latitude: Number,
  longitude: Number,
});
