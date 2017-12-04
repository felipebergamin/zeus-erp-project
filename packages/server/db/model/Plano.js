const mongoose = require('mongoose');
const schema = require('../schema/PlanoSchema');

module.exports = mongoose.model('Plano', schema);
