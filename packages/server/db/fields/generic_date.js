const moment = require('moment');

module.exports = {
    type: Date,
    validate: {
        validator: date=>moment(date).isValid(),
        message: 'A data é inválida!'
    }
}