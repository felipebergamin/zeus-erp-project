import { instanceDB } from "../../db/initConnection";
import { IItemEstoque } from "../../interfaces/IItemEstoque";
import { IRepository } from "../../interfaces/IRepository";
import { RepositoryBaixaEstoque } from './repository-baixa-estoque';
import { RepositoryLancamentosEstoque } from './repository-lancamentos-estoque';
import * as utils from './utils';

export class RepositoryItemEstoque implements IRepository<IItemEstoque> {

  constructor(
    private repoLancamentoEstoque: RepositoryLancamentosEstoque,
    private repoBaixaEstoque: RepositoryBaixaEstoque,
  ) { }

  public async create(data: IItemEstoque | IItemEstoque[]): Promise<IItemEstoque> {
    const ItemEstoque = (await instanceDB()).model('ItemEstoque');
    const item = new ItemEstoque(data);
    await item.save();

    return item.toObject();
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IItemEstoque> {
    const ItemEstoque = (await instanceDB()).model('ItemEstoque');
    const query = ItemEstoque.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }

    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec()).toObject();
  }

  // tslint:disable-next-line:max-line-length
  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IItemEstoque[]> {
    const ItemEstoque = (await instanceDB()).model('ItemEstoque');

    const query = ItemEstoque.find(searchValues);
    const { fields, populate } = options;

    if (fields) {
      let selectFields = fields;
      if (selectFields.includes("quantidade") && !selectFields.includes("quantidadeInicial")) {
        selectFields += " quantidadeInicial";
      }
      query.select(utils.normalizeFields(selectFields));
    }

    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    const itensEstoque = (await query.exec()).map((el) => el.toObject()) as IItemEstoque[];

    if (!fields || utils.normalizeFields(fields).split(" ").some((field) => field === 'quantidade')) {
      const lancamentos = await this.repoLancamentoEstoque.summarizeAndGetSum();

      itensEstoque.forEach((item) => {
        const lancamento = lancamentos.find((l) => l._id.toString() === item._id.toString());

        if (!lancamento) {
          item.quantidade = item.quantidadeInicial;
          return;
        }

        item.quantidade = item.quantidadeInicial + lancamento.total;
      });
    }

    return itensEstoque;
  }

  public async remove(id: string): Promise<IItemEstoque> {
    return null;
  }

  public async update(id: string, data: IItemEstoque): Promise<{ result: IItemEstoque, modifiedPaths: string }> {
    const ItemEstoque = (await instanceDB()).model('ItemEstoque');

    const item = await ItemEstoque.findById(id).exec();
    item.set(data);
    const modifiedPaths = item.modifiedPaths().join(', ');
    await item.save();

    return {
      modifiedPaths,
      result: item.toObject(),
    };
  }
}
