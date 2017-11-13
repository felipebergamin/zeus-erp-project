const ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
    type: ObjectId,
    ref: 'SignaturePlan',
    required: [true, 'Plano de assinatura não definido!']
}