export class ContaBancaria {
  public agencia: {
    digito: string;
    numero: string;
  };
  public carteira: string;
  public cedente: string;
  public codigoCedente: string;
  public conta: {
    digito: string;
    numero: string;
  };
  public excluido: boolean;
  public multaDia: number;
  public multaVencimento: number;
  public nome: string;
  public nossoNumero: number;
  public proximaRemessa: number;

  public alteradoEm: Date;
  public criadoEm: Date;
  public excluidoEm: Date;
}
