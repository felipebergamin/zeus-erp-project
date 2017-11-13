module.exports = {
    type: String,
    validate: [
        {
            validator: desc=>desc.length > 0,
            message: 'Descricao vazia!'
        },
        {
            validator: desc=>desc.length<=140,
            message: 'O máximo permitido é 140 caracteres!'
        }
    ]
}