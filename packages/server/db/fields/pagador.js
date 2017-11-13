module.exports = {
    type: require('mongoose').Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'O boleto deve ter um pagador associado!']
}