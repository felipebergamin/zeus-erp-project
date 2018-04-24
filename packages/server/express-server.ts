import bodyparser = require('body-parser');
import express = require('express');

/* EXPRESS ROUTERS */
import arquivoRemessaRouter = require('./http/routers/ArquivoRemessaRouter');
import apiRetornoRouter = require('./http/routers/ArquivoRetornoRouter');
import apiBaixaEstoqueRouter = require('./http/routers/baixa-estoque-router');
import apiBoletoRouter = require('./http/routers/BoletoBancarioRouter');
import apiCarneRouter = require('./http/routers/CarneRouter');
import chamadoTecnicoRouter = require("./http/routers/ChamadoTecnicoRouter");
import apiCliente = require('./http/routers/ClienteRouter');
import apiContaBancariaRouter = require('./http/routers/ContaBancariaRouter');
import fiberhomeServicesRouter = require('./http/routers/FiberhomeServicesRouter');
import apiInstalacaoRouter = require('./http/routers/InstalacaoRouter');
import ipPoolRouter = require("./http/routers/IPPoolRouter");
import apiItemEstoqueRouter = require('./http/routers/item-estoque-router');
import apiLancamentoEstoqueRouter = require('./http/routers/lancamentos-estoque-router');
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
import uploadRetornoMiddleware = require('./http/middlewares/uploadRetorno');

const app = express().disable('x-powered-by');

// SET MIDDLEWARES
app.use(setCorsHeadersMiddleware);
app.use(corsMiddleware);
app.use(uploadRetornoMiddleware);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// SET ROUTERS
// app.use('/api', authMiddleware);
app.use('/api/cliente', authMiddleware, apiCliente);
app.use('/api/plano', authMiddleware, apiPlanoRouter);
app.use('/api/boleto', authMiddleware, apiBoletoRouter);
app.use('/api/instalacao', authMiddleware, apiInstalacaoRouter);
app.use('/api/usuario', authMiddleware, apiUsuarioRouter);
app.use('/api/contabancaria', authMiddleware, apiContaBancariaRouter);
app.use('/api/carne', authMiddleware, apiCarneRouter);
app.use('/api/log', authMiddleware, logRouter);
app.use('/api/perfilusuario', authMiddleware, perfilUsuarioRouter);
app.use('/api/olt', authMiddleware, oltRouter);
app.use('/api/fiberhome', authMiddleware, fiberhomeServicesRouter);
app.use('/api/chamadotecnico', authMiddleware, chamadoTecnicoRouter);
app.use('/api/ippool', authMiddleware, ipPoolRouter);
app.use('/api/remessa', authMiddleware, arquivoRemessaRouter);
app.use('/api/retorno', authMiddleware, apiRetornoRouter);
app.use('/api/itemestoque', authMiddleware, apiItemEstoqueRouter);
app.use('/api/baixaestoque', authMiddleware, apiBaixaEstoqueRouter);
app.use('/api/lancamentoestoque', authMiddleware, apiLancamentoEstoqueRouter);
app.use('/api/auth', apiLoginRouter);

export = app;
