export interface IItemEstoque {
  _id: string;

  nome: string;
  observacao?: string;
  quantidade: number;
  quantidadeInicial: number;
  quantidadeMinima: number;
  unidadeMedida: string;
}
