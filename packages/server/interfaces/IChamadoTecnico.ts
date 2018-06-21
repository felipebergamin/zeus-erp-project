import { IBoletoBancario } from "./IBoletoBancario";
import { ICliente } from "./ICliente";
import { IPontoDeAcesso } from "./IPontoDeAcesso";
import { IUsuario } from "./IUsuario";

export interface IChamadoTecnico {
  _id?: string;
  alteradoEm: Date;
  criadoEm: Date;

  cancelado: boolean;
  canceladoEm: Date;
  canceladoPor: string|IUsuario;
  motivoCancelamento: string;

  finalizado: boolean;
  finalizadoEm: Date;
  imagemAssinatura: string;
  observacoesTecnico?: string;

  abertoPor: string|IUsuario;
  mensagem: string;
  motivoAbertura: string;

  cliente: string|ICliente;
  pontoAcesso: string|IPontoDeAcesso;

  protocolo: string;
  tecnico: string|IUsuario;

  problema?: string;
  boletoCobranca?: string|IBoletoBancario;
  geraCobranca?: boolean;
  isentarCobranca?: boolean;
  valorACobrar?: number;
}
