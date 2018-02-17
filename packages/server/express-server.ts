import bodyparser = require('body-parser');
import express = require('express');

/* EXPRESS ROUTERS */
import apiBoletoRouter = require('./http/routers/BoletoBancarioRouter');
import apiCarneRouter = require('./http/routers/CarneRouter');
import chamadoTecnicoRouter = require("./http/routers/ChamadoTecnicoRouter");
import apiCliente = require('./http/routers/ClienteRouter');
import apiContaBancariaRouter = require('./http/routers/ContaBancariaRouter');
import fiberhomeServicesRouter = require('./http/routers/FiberhomeServicesRouter');
import apiInstalacaoRouter = require('./http/routers/InstalacaoRouter');
import ipPoolRouter = require("./http/routers/IPPoolRouter");
import apiLoginRouter = require('./http/routers/LoginRouter');
import logRouter = require('./http/routers/LogRouter');
import oltRouter = require('./http/routers/OLTRouter');
import perfilUsuarioRouter = require('./http/routers/PerfilUsuarioRouter');
import apiPlanoRouter = require('./http/routers/PlanoRouter');
import apiUsuarioRouter = require('./http/routers/UsuarioRouter');

/* MIDDLEWARES */
import corsMiddleware = require('./http/middlewares/corsCheckMiddleware');
import setCorsHeadersMiddleware = require("./http/middlewares/corsResponseHeaders");
import authMiddleware = require('./http/middlewares/isAuth');

const app = express().disable('x-powered-by');

// SET MIDDLEWARES
app.use(setCorsHeadersMiddleware);
app.use(corsMiddleware);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// SET ROUTERS
app.use('/api', authMiddleware);
app.use('/api/cliente', apiCliente);
app.use('/api/plano', apiPlanoRouter);
app.use('/api/boleto', apiBoletoRouter);
app.use('/api/instalacao', apiInstalacaoRouter);
app.use('/api/usuario', apiUsuarioRouter);
app.use('/api/contabancaria', apiContaBancariaRouter);
app.use('/api/carne', apiCarneRouter);
app.use('/api/log', logRouter);
app.use('/api/perfilusuario', perfilUsuarioRouter);
app.use('/api/olt', oltRouter);
app.use('/api/fiberhome', fiberhomeServicesRouter);
app.use('/api/chamadotecnico', chamadoTecnicoRouter);
app.use('/api/ippool', ipPoolRouter);
app.use('/auth', apiLoginRouter);

export = app;
