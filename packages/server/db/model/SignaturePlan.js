const mongoose = require('mongoose');
const _schema = require('../schema/SignaturePlanSchema');

module.exports = mongoose.model('SignaturePlan', _schema);