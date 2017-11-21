// valida se é um número ou a string "S/N"
module.exports = numero=>/^(S\/N|\d*)$/i.test(numero);