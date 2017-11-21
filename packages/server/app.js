global.debug            = require('debug')('zeus');
const mongoose          = require('./db/connection');
const bodyparser        = require('body-parser');

const express           = require('express');
const app               = express();

const apiCliente        = require('./modules/routers/ClienteRouter');
const apiPlanoRouter    = require('./modules/routers/PlanoRouter');
const apiBoletoRouter   = require('./modules/routers/BoletoBancarioRouter');

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
    });

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use('/api/cliente', apiCliente);
app.use('/api/plano', apiPlanoRouter);
app.use('/api/boleto', apiBoletoRouter);

app.listen(3000, ()=>debug('server listening'));