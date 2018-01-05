export = (numero: string) => numero.replace(/\(/g, '')
  .replace(/\)/g, '')
  .replace(/-/g, '');
