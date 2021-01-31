import { Boleto } from './Boleto';
import { ArquivoRetorno } from './ArquivoRetorno';

export class OcorrenciaBancaria {
  _id?: number;

  idOcorrencia?: string;
  dataOcorrenciaNoBanco?: Date;
  bancoCobrador?: string;
  agenciaCobradora?: string;
  valorPago?: number;
  jurosMora?: number;
  dataCredito?: Date;
  motivosOcorrencia?: string;
  dataHora?: Date;

  boleto?: Boleto;
  arquivoRetorno?: ArquivoRetorno;
}
