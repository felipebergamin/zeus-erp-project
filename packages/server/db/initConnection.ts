import * as mongoose from 'mongoose';
import debug = require('../debug');

import db = require("./connection");

import baixaEstoqueSchema = require('./schema/BaixaEstoqueSchema');
import boletoSchema = require("./schema/BoletoBancarioSchema");
import carneSchema = require("./schema/CarneSchema");
import chamadoTecnicoSchema = require("./schema/ChamadoTecnicoSchema");
import clienteSchema = require("./schema/ClienteSchema");
import contaBancariaSchema = require("./schema/ContaBancariaSchema");
import instalacaoSchema = require("./schema/InstalacaoSchema");
import ipPoolSchema = require("./schema/IPPoolSchema");
import itemEstoqueSchema = require('./schema/ItemEstoqueSchema');
import lancamentosEstoqueSchema = require('./schema/LancamentoEstoqueSchema');
import logSchema = require("./schema/LogSchema");
import oltSchema = require("./schema/OLTSchema");
import perfilUsuarioSchema = require("./schema/PerfilUsuarioSchema");
import planoSchema = require("./schema/PlanoSchema");
import arquivoRemessaSchema = require("./schema/Remessa");
import arquivoRetornoSchema = require("./schema/Retorno");
import usuarioSchema = require("./schema/UsuarioSchema");

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debug('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

db.then((mongoClient: typeof mongoose) => {
  debug('Mongoose default connection is open');
  mongoClient.model("BoletoBancario", boletoSchema);
  mongoClient.model("Carne", carneSchema);
  mongoClient.model("ChamadoTecnico", chamadoTecnicoSchema);
  mongoClient.model("Cliente", clienteSchema);
  mongoClient.model("ContaBancaria", contaBancariaSchema);
  mongoClient.model("Instalacao", instalacaoSchema);
  mongoClient.model("IPPool", ipPoolSchema);
  mongoClient.model("Log", logSchema);
  mongoClient.model("OLT", oltSchema);
  mongoClient.model("PerfilUsuario", perfilUsuarioSchema);
  mongoClient.model("Plano", planoSchema);
  mongoClient.model("Usuario", usuarioSchema);
  mongoClient.model("ArquivoRemessa", arquivoRemessaSchema);
  mongoClient.model("ArquivoRetorno", arquivoRetornoSchema);
  mongoClient.model("ItemEstoque", itemEstoqueSchema, 'itensEstoque');
  mongoClient.model("BaixaEstoque", baixaEstoqueSchema, 'baixasEstoque');
  mongoClient.model("LancamentoEstoque", lancamentosEstoqueSchema, 'lancamentosEstoque');
  debug("models registrados");
  return mongoClient;
});

export function instanceDB(): Promise<typeof mongoose> {
  return db;
}
