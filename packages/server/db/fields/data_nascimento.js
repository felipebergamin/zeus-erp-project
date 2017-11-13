const moment        = require('moment');

const isValidDate   = require('../validators/isValidDate');
const isOfAge       = require('../validators/isOfAge');

const data_nascimento = {
    type: Date,
    required: [true, 'Está faltando a data de nascimento!'],
    validate: [
        {
            validator: isValidDate,
            message: 'A data é inválida!'
        },
        {
            validator: isOfAge,
            message: 'Menor de 18 anos!'
        }
    ]
}

module.exports = data_nascimento;