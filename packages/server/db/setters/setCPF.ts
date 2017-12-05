export = (cpf_cnpj: string) => cpf_cnpj.replace(/\./g, '')
  .replace(/-/g, '')
  .replace(/\//g, '');
