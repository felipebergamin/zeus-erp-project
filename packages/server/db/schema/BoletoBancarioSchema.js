const { Schema, connection } = require('mongoose');
const autoIncrement = require('../plugins/auto-increment');

autoIncrement.initialize(connection);

const BoletoSchema = new Schema({
    valor: require('../fields/valor_boleto'),
    valor_pago: Number,
    data_vencimento: require('../fields/data_vencimento'),
    data_pagamento: require('../fields/data_pagamento'),
    criado_em: require('../fields/criado_em'),
    alterado_em: require('../fields/alterado_em'),
    excluido_em: require('../fields/excluido_em'),
    descricao: require('../fields/descricao'),
    conta_bancaria: require('../fields/conta_bancaria'),
    enviado_remessa: require('../fields/enviado_remessa'),
    cliente: require('../fields/cliente'),
});

BoletoSchema.plugin(autoIncrement.plugin, { model: 'BoletoBancario', field: 'numero_boleto', startAt: 1 });
module.exports = BoletoSchema;
