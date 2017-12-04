module.exports = numero => numero.replace(/\(/g, '')
  .replace(/\)/g, '')
  .replace(/-/g, '');
