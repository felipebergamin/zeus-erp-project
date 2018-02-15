import { Cliente } from "./Cliente";
import { Usuario } from "./Usuario";

export class Instalacao {
  public cancelada: boolean;
  public dataHoraCancelada: Date;
  public motivoCancelamento: string;

  public concluida: boolean;
  public dataAgenda: Date;
  public dataHoraConclusao: Date;

  public cliente: string|Cliente;
  public protocolo: string;
  public tecnicoResponsavel: string|Usuario;

  public alteradoEm: Date;
  public criadoEm: Date;
}
