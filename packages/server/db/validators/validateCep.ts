export function validateCep(cep: string) {
  /\d{5}-{0,1}\d{3}/.test(cep);
}
