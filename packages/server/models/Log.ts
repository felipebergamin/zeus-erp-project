import { Usuario } from "./Usuario";

export class Log {
  public dataHora: Date;
  public level: string;
  public objectToken: string;
  public systemOutput: string;
  public texto: string;
  public usuario: string|Usuario;
}
