const { Schema }        = require('mongoose');

module.exports = new Schema({
    /* informações pessoa */
    cpf_cnpj: require('../fields/cpf_cnpj'),
    criado_em: require('../fields/criado_em'),
    alterado_em: require('../fields/alterado_em'),
    data_nascimento: require('../fields/data_nascimento'),
    nome: require('../fields/nome_pessoa'),
    // rg_ie,
    // tags,
    tipo_pessoa: require('../fields/tipo_pessoa'),
    
    /* informações de contato */
    // cellphone,
    // email,
    // phone,

    /* informações de conexão */
    // ip,
    // login,
    // mac,
    // mac_onu,
    // olt,
    // passwd,
    // plano,
    // pon_slot,
    // slot_olt,
    
    /* informações de endereço */
    // bairro_residencial,
    // cep_residencial,
    // cidade_residencial,
    // complemento_residencial,
    // endereco_residencial,
    // estado_residencial,
    // numero_residencial,

    // endereco_correspondencia,
    // numero_correspondencia,
    // bairro_correspondencia,
    // complemento_correspondencia,
    // cidade_correspondencia,
    // estado_correspondencia,
    // cep_correspondencia,

    /* informações financeiras */
    // isento_mensalidade,
    // data_vencimento,
    // auto_bloquear,
    // conta_boletos,
    // observacoes

    /* referencias para outros objetos */
    signature_plan: require('../fields/signature_plan')
});