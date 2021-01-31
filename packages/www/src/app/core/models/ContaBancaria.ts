export interface ContaBancaria {
  _id?: number;
  digitoAgencia?: string;
  numeroAgencia?: string;
  carteira?: string;
  cedente?: string;
  codigoCedente?: string;
  digitoConta?: string;
  numeroConta?: string;
  multaDia?: number;
  multaVencimento?: number;
  nome?: string;
  nossoNumero?: number;
  proximaRemessa?: number;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
