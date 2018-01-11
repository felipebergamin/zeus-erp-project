import mongoose = require('mongoose');
import schema = require('../schema/InstalacaoSchema');

export = mongoose.model('Instalacao', schema, "instalacoes");
