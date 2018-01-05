// valida se é um número ou a string "S/N"
export function isNumberOrSN(numero: string) {
  /^(S\/N|\d*)$/i.test(numero);
}
