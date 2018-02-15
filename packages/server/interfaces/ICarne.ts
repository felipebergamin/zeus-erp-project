import { ICliente } from "./ICliente";

export interface ICarne {
  cliente: string|ICliente;
  descricao: string;
  excluido: boolean;
  idCarne: string;

  alteradoEm: Date;
  criadoEm: Date;
  excluidoEm: Date;
}
