import { Usuario } from './Usuario';
import { PontoAcesso } from './PontoAcesso';

export class Instalacao {
  _id?: number;
  cancelada?: boolean;
  dataHoraCancelada?: Date;
  motivoCancelamento?: string;

  atendente?: Usuario;
  observacoesAtendente?: string;

  concluida?: boolean;
  dataAgenda?: Date;
  dataHoraConclusao?: Date;

  pontoAcesso?: PontoAcesso;
  protocolo?: string;
  tecnicoResponsavel?: Usuario;

  recebidoPor: Usuario;
  cobrado?: boolean;
  dataPagamento?: Date;
  modoPagamento?: 'cheque' | 'dinheiro' | 'cartao' | 'boleto';
  observacoesPagamento?: string;
  pago?: boolean;
  valor?: number;
}
