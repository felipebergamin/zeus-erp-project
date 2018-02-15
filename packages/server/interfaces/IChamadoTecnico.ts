import { ICliente } from "./ICliente";
import { IUsuario } from "./IUsuario";

export interface IChamadoTecnico {
  alteradoEm: Date;
  criadoEm: Date;

  cancelado: boolean;
  canceladoEm: Date;
  canceladoPor: string|IUsuario;
  motivoCancelamento: string;

  finalizado: boolean;
  finalizadoEm: Date;
  imagemAssinatura: string;
  justificativaFechamento: string;

  abertoPor: string|IUsuario;
  mensagem: string;
  motivoAbertura: string;

  cliente: string|ICliente;
  protocolo: string;
  tecnico: string|IUsuario;
}
