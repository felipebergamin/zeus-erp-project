export class Boleto {
  _id?: number;
  baixado?: boolean;
  carne?: number;
  cliente?: number;
  contaBancaria?: number;
  dataBaixa?: Date;
  dataCredito?: Date;
  dataPagamento?: Date;
  dataVencimento?: Date;
  digitoNossoNumero?: string;
  registrado?: boolean;
  enviarAtualizacaoValor?: boolean;
  enviarAtualizacaoVencimento?: boolean;
  enviarPedidoBaixa?: boolean;
  nossoNumero?: number;
  numeroBoleto?: number;
  ocorrencias?: number;
  pago?: boolean;
  valorCobranca?: number;
  valorPago?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
