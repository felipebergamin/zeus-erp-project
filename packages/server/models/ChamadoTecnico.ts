import { Cliente } from "./Cliente";
import { Usuario } from "./Usuario";

export class ChamadoTecnico {
  public alteradoEm: Date;
  public criadoEm: Date;

  public cancelado: boolean;
  public canceladoEm: Date;
  public canceladoPor: string|Usuario;
  public motivoCancelamento: string;

  public finalizado: boolean;
  public finalizadoEm: Date;
  public imagemAssinatura: string;
  public justificativaFechamento: string;

  public abertoPor: string|Usuario;
  public mensagem: string;
  public motivoAbertura: string;

  public cliente: string|Cliente;
  public protocolo: string;
  public tecnico: string|Usuario;
}
