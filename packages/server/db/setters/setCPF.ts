export = (cpfCnpj: string) => cpfCnpj.replace(/\./g, '')
  .replace(/-/g, '')
  .replace(/\//g, '');
