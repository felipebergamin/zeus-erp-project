export interface IContaBancaria {
  agencia: {
    digito: string;
    numero: string;
  };
  carteira: string;
  cedente: string;
  codigoCedente: string;
  conta: {
    digito: string;
    numero: string;
  };
  excluido: boolean;
  multaDia: number;
  multaVencimento: number;
  nome: string;
  nossoNumero: number;
  proximaRemessa: number;

  alteradoEm: Date;
  criadoEm: Date;
  excluidoEm: Date;
}
