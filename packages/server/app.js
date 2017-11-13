global.debug        = require('debug')('zeus');
const mongoose      = require('./db/connection');
const bodyparser    = require('body-parser');

const express       = require('express');
const app           = express();

const clientRouter          = require('./modules/routers/ClientRouter');
const signaturePlanRouter   = require('./modules/routers/SignaturePlanRouter');
const boletoRouter          = require('./modules/routers/BoletoBancarioRouter');

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.use('/api/client', clientRouter);
app.use('/api/signature_plan', signaturePlanRouter);
app.use('/api/boleto', boletoRouter);

app.listen(3000, ()=>debug('server listening'));