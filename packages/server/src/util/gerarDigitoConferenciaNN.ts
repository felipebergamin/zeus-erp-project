export function gerarDigitoAutoConferencia(carteira: string, nossoNumero: number): string {
  const carteiraNN = `${carteira.padStart(2, "0")}${nossoNumero.toString().padStart(11, "0")}`.split("");
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
