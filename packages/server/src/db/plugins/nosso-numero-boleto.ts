
function gerarDigitoAutoConferencia(carteira: string, nossoNumero: string): string {
  const carteiraNN = `${carteira.padStart(2, "0")}${nossoNumero.padStart(11, "0")}`.split("");
  const multiplicadores = [ 2, 7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2 ];
  const produtos = [];

  for (let i = 0; i < carteiraNN.length; i++) {
    produtos.push(multiplicadores[i] * Number(carteiraNN[i]));
  }

  const somatorio = produtos.reduce((previousValue, currentValue) => {
    return previousValue += currentValue;
  }, 0);

  const resto = somatorio % 11;
  let digitoConferencia;

  if (resto === 1) {
    digitoConferencia = "P";
  } else if (resto === 0) {
    digitoConferencia = "0";
  } else {
    digitoConferencia = (11 - resto).toString();
  }

  return digitoConferencia;
}
/*
export function plugin(schema: Schema) {
  schema.pre('save', async function gerarNossoNumero(next) {
    try {
      const boleto: Schema = this;

      const repoContaBancaria = new RepositoryContaBancaria();

      const conta = await repoContaBancaria.get(boleto.get("contaBancaria"));
      const nossoNumero = (conta.nossoNumero + boleto.get("numeroBoleto")).toString();
      const digitoConferencia = gerarDigitoAutoConferencia(conta.carteira, nossoNumero);

      boleto.set("nossoNumero", nossoNumero);
      boleto.set("digitoNossoNumero", digitoConferencia);

      next();
    } catch (err) {
      next(err);
    }
  });
}
*/
