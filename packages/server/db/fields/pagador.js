module.exports = {
    type: require('mongoose').Schema.Types.ObjectId,
    ref: 'Cliente',
    required: [true, 'O boleto deve ter um pagador associado!']
}