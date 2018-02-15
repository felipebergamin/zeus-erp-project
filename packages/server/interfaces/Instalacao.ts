import { ICliente } from "./ICliente";
import { IUsuario } from "./IUsuario";

export interface Instalacao {
  cancelada: boolean;
  dataHoraCancelada: Date;
  motivoCancelamento: string;

  concluida: boolean;
  dataAgenda: Date;
  dataHoraConclusao: Date;

  cliente: string|ICliente;
  protocolo: string;
  tecnicoResponsavel: string|IUsuario;

  alteradoEm: Date;
  criadoEm: Date;
}
