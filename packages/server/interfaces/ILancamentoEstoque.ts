import { IItemEstoque } from "./IItemEstoque";
import { IUsuario } from "./IUsuario";

export interface ILancamentoEstoque {
  _id: string;
  criadoEm: Date;
  criadoPor: string|IUsuario;

  itens: [{
    item: string|IItemEstoque,
    quantidade: number,
  }];
}
