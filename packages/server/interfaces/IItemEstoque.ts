export interface IItemEstoque {
  _id: string;

  nome: string;
  observacao?: string;
  quantidade: number;
  quantidadeMinima: number;
  unidadeMedida: string;
}
