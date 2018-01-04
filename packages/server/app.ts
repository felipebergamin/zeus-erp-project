import debug = require('./debug');
import bodyparser = require('body-parser');
import express = require('express');
import mongoose = require('./db/connection');

import { FiberhomeService } from "./modules/services/FiberhomeService";
FiberhomeService.instance();

import apiCliente = require('./modules/routers/ClienteRouter');
import apiPlanoRouter = require('./modules/routers/PlanoRouter');
import apiBoletoRouter = require('./modules/routers/BoletoBancarioRouter');
import apiTecnicoRouter = require('./modules/routers/TecnicoRouter');
import apiInstalacaoRouter = require('./modules/routers/InstalacaoRouter');
import apiUsuarioRouter = require('./modules/routers/UsuarioRouter');
import apiLoginRouter = require('./modules/routers/LoginRouter');
import apiContaBancariaRouter = require('./modules/routers/ContaBancariaRouter');
import apiCarneRouter = require('./modules/routers/CarneRouter');
import perfilUsuarioRouter = require('./modules/routers/PerfilUsuarioRouter');
import authMiddleware = require('./modules/http_middleware/isAuth');
import logRouter = require('./modules/routers/LogRouter');
import oltRouter = require('./modules/routers/OLTRouter');
import fiberhomeServicesRouter = require('./modules/routers/FiberhomeServicesRouter');
import chamadoTecnicoRouter = require("./modules/routers/ChamadoTecnicoRouter");
const app = express().disable('x-powered-by');

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'content-type,x-access-token');

  // Pass to next layer of middleware
  next();
});

app.use((req, res, next) => {
  if (req.header('Access-Control-Request-Method') && req.header('Access-Control-Request-Headers')) {
    res.status(200).send();
  } else {
    next();
  }
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use('/api', authMiddleware);
app.use('/api/cliente', apiCliente);
app.use('/api/plano', apiPlanoRouter);
app.use('/api/boleto', apiBoletoRouter);
app.use('/api/instalacao', apiInstalacaoRouter);
app.use('/api/tecnico', apiTecnicoRouter);
app.use('/api/usuario', apiUsuarioRouter);
app.use('/api/contabancaria', apiContaBancariaRouter);
app.use('/api/carne', apiCarneRouter);
app.use('/api/log', logRouter);
app.use('/api/perfilusuario', perfilUsuarioRouter);
app.use('/api/olt', oltRouter);
app.use('/api/fiberhome', fiberhomeServicesRouter);
app.use('/api/chamadotecnico', chamadoTecnicoRouter);
app.use('/auth', apiLoginRouter);

app.listen(3000, () => debug('server listening'));
