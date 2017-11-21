module.exports = {
    type: String,
    required: [true, 'O login do cliente não foi definido!'],
    unique: [true, 'Este login já existe no sistema!'],
    validate: {
        validator: require('../validators/email'),
        message: 'O login tem um formato inválido!'
    }
}