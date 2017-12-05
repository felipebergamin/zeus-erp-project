// valida se é um número ou a string "S/N"
module.exports = (numero: string) => /^(S\/N|\d*)$/i.test(numero);
