module.exports = cpf_cnpj => cpf_cnpj.replace(/\./g, '')
  .replace(/-/g, '')
  .replace(/\//g, '');
