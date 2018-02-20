import * as mongoose from 'mongoose';
import debug = require('../debug');

import boletoSchema = require("./schema/BoletoBancarioSchema");
import carneSchema = require("./schema/CarneSchema");
import chamadoTecnicoSchema = require("./schema/ChamadoTecnicoSchema");
import clienteSchema = require("./schema/ClienteSchema");
import contaBancariaSchema = require("./schema/ContaBancariaSchema");
import instalacaoSchema = require("./schema/InstalacaoSchema");
import ipPoolSchema = require("./schema/IPPoolSchema");
import logSchema = require("./schema/LogSchema");
import oltSchema = require("./schema/OLTSchema");
import perfilUsuarioSchema = require("./schema/PerfilUsuarioSchema");
import planoSchema = require("./schema/PlanoSchema");
import usuarioSchema = require("./schema/UsuarioSchema");

(mongoose as any).Promise = global.Promise;
mongoose.connect('mongodb://localhost/zeus', { useMongoClient: true });

mongoose.connection.on('error', (err) => {
  debug(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  debug('Mongoose default connection disconnected');
});

mongoose.connection.on('open', () => {
  debug('Mongoose default connection is open');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debug('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

mongoose.model("BoletoBancario", boletoSchema);
mongoose.model("Carne", carneSchema);
mongoose.model("ChamadoTecnico", chamadoTecnicoSchema);
mongoose.model("Cliente", clienteSchema);
mongoose.model("ContaBancaria", contaBancariaSchema);
mongoose.model("Instalacao", instalacaoSchema);
mongoose.model("IPPool", ipPoolSchema);
mongoose.model("Log", logSchema);
mongoose.model("OLT", oltSchema);
mongoose.model("PerfilUsuario", perfilUsuarioSchema);
mongoose.model("Plano", planoSchema);
mongoose.model("Usuario", usuarioSchema);

export = mongoose;
