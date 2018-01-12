import bodyparser = require('body-parser');
import express = require('express');

/* EXPRESS ROUTERS */
import apiBoletoRouter = require('./modules/routers/BoletoBancarioRouter');
import apiCarneRouter = require('./modules/routers/CarneRouter');
import chamadoTecnicoRouter = require("./modules/routers/ChamadoTecnicoRouter");
import apiCliente = require('./modules/routers/ClienteRouter');
import apiContaBancariaRouter = require('./modules/routers/ContaBancariaRouter');
import fiberhomeServicesRouter = require('./modules/routers/FiberhomeServicesRouter');
import apiInstalacaoRouter = require('./modules/routers/InstalacaoRouter');
import ipPoolRouter = require("./modules/routers/IPPoolRouter");
import apiLoginRouter = require('./modules/routers/LoginRouter');
import logRouter = require('./modules/routers/LogRouter');
import oltRouter = require('./modules/routers/OLTRouter');
import perfilUsuarioRouter = require('./modules/routers/PerfilUsuarioRouter');
import apiPlanoRouter = require('./modules/routers/PlanoRouter');
// import apiTecnicoRouter = require('./modules/routers/TecnicoRouter');
import apiUsuarioRouter = require('./modules/routers/UsuarioRouter');

/* MIDDLEWARES */
import corsMiddleware = require('./modules/http_middleware/corsCheckMiddleware');
import setCorsHeadersMiddleware = require("./modules/http_middleware/corsResponseHeaders");
import authMiddleware = require('./modules/http_middleware/isAuth');

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
// app.use('/api/tecnico', apiTecnicoRouter);
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
