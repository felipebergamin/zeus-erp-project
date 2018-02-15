import { Cliente } from "./Cliente";

export class Carne {
  public cliente: string|Cliente;
  public descricao: string;
  public excluido: boolean;
  public idCarne: string;

  public alteradoEm: Date;
  public criadoEm: Date;
  public excluidoEm: Date;
}
