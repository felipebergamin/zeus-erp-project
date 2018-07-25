import { IUsuario } from "./IUsuario";

export interface ILog {
  dataHora: Date;
  level: string;
  objectToken: string;
  systemOutput: string;
  texto: string;
  usuario: string|IUsuario;
}
