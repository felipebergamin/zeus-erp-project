import { ICliente } from "./ICliente";
import { IPontoDeAcesso } from "./IPontoDeAcesso";
import { IUsuario } from "./IUsuario";

export interface IInstalacao {
  _id: string;
  cancelada: boolean;
  dataHoraCancelada: Date;
  motivoCancelamento: string;
  observacoesAtendente?: string;

  concluida: boolean;
  dataAgenda: Date;
  dataHoraConclusao: Date;

  cliente: string|ICliente;
  protocolo: string;
  tecnicoResponsavel: string|IUsuario;
  pontoAcesso: string|IPontoDeAcesso;

  cobrado: boolean;
  dataPagamento: Date;
  modoPagamento?: string;
  observacoesPagamento?: string;
  pago: boolean;
  recebidoPor?: string|IUsuario;
  valor?: number;

  alteradoEm: Date;
  criadoEm: Date;
}
