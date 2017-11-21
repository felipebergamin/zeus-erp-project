const mongoose = require('mongoose');
const _schema = require('../schema/PlanoSchema');

module.exports = mongoose.model('Plano', _schema);