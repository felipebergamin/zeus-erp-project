import { Schema } from 'mongoose';

export = new Schema({
  bairro: require('../fields/bairro'),
  cep: require('../fields/cep'),
  cidade: require('../fields/cidade'),
  complemento: String,
  estado: require('../fields/estado'),
  ibge: Number,
  latitude: Number,
  logradouro: require('../fields/logradouro'),
  longitude: Number,
  numero: require('../fields/numero_endereco'),
});
