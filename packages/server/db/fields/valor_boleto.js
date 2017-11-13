module.exports = {
    type: Number,
    min: [10, 'O valor é muito baixo!'],
    required: [true, 'Um boleto sem valor? Pode isso, produção?']
}
