import { BoletoAttributes } from "../models/BoletoModel";

export interface ITransactionRetorno {
  boleto?: BoletoAttributes;
  descricaoErro?: string;
  descricaoMotivoOcorrencia?: string;
  descricaoOcorrencia?: string;
  erro?: boolean;

  idRegistro: string;
  tipoInscricaoEmpresa: string;
  numeroInscricao: string;
  idEmpresaBeneficiaria: string;
  numeroControle: string;
  idTitulo: string;
  idRateio: string;
  pagamentoParcial: string;
  carteira: string;
  idOcorrencia: string;
  dataOcorrencia: Date;
  numeroDocumento: string;
  idTituloBanco: string;
  vencimentoTitulo: Date;
  valorTitulo: number;
  bancoCobrador: string;
  agenciaCobradora: string;
  despesaCobranca: number;
  outrasDespesas: number;
  jurosAtraso: number;
  iof: number;
  abatimento: number;
  descontoConcedido: number;
  valorPago: number;
  jurosMora: number;
  outrosCreditos: number;
  motivoOcorrencia: string;
  dataCredito: Date;
  origemPagamento: string;
  chequeBradesco: string;
  motivoRejeicao: string;
  numeroCartorio: string;
  numeroProtocolo: string;
  sequenciaRegistro: number;
}
