import { IBoletoBancario } from "./IBoletoBancario";
import { ICliente } from "./ICliente";

export interface ICarne {
  _id: string;
  cliente: string|ICliente;
  descricao: string;
  excluido: boolean;
  idCarne: string;

  parcelas?: number;
  primeiroVencimento?: Date;
  valor?: number;

  alteradoEm: Date;
  criadoEm: Date;
  excluidoEm: Date;
}
