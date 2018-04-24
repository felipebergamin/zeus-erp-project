import { instanceDB } from "../../db/initConnection";
import { ILancamentoEstoque } from "../../interfaces/ILancamentoEstoque";
import { IRepository } from "../../interfaces/IRepository";
import { RepositoryItemEstoque } from "./repository-item-estoque";
import * as utils from './utils';

export class RepositoryLancamentosEstoque implements IRepository<ILancamentoEstoque> {

  constructor(private repoItemEstoque: RepositoryItemEstoque) {}

  public async create(data: ILancamentoEstoque|ILancamentoEstoque[]): Promise<ILancamentoEstoque> {
    const LancamentoEstoque = (await instanceDB()).model('LancamentoEstoque');
    const lancamento = (await new LancamentoEstoque(data).save()).toObject() as ILancamentoEstoque;

    const getItemId = (itemBaixa: any): string => {
      if ('item' in itemBaixa) {
        return itemBaixa.item;
      }
      return itemBaixa;
    };

    lancamento.itens.forEach((itemLancamento) => {
      this.repoItemEstoque.lancarItem(getItemId(itemLancamento), itemLancamento.quantidade);
    });

    return lancamento;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<ILancamentoEstoque> {
    const LancamentoEstoque = (await instanceDB()).model('LancamentoEstoque');
    const query = LancamentoEstoque.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }

    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    query.populate({
      path: 'itens',
      populate: {
        model: 'ItemEstoque',
        path: 'item',
      },
    });

    return (await query.exec()).toObject();
  }

  // tslint:disable-next-line:max-line-length
  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<ILancamentoEstoque[]> {
    const LancamentoEstoque = (await instanceDB()).model('LancamentoEstoque');

    const query = LancamentoEstoque.find(searchValues);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }

    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    query.populate({
      path: 'itens',
      populate: {
        model: 'ItemEstoque',
        path: 'item',
      },
    });

    return (await query.exec()).map((el) => el.toObject());
  }

  public async remove(id: string): Promise<ILancamentoEstoque> {
    const LancamentoEstoque = (await instanceDB()).model('LancamentoEstoque');
    const baixa = (await LancamentoEstoque.findByIdAndRemove(id).exec()).toObject();

    const getItemId = (itemBaixa: any): string => {
      if ('item' in itemBaixa) {
        return itemBaixa.item;
      }
      return itemBaixa;
    };

    baixa.itens.forEach((itemBaixa: any) => {
      this.repoItemEstoque.baixaItem(getItemId(itemBaixa), itemBaixa.quantidade);
    });

    return baixa;
  }

  // tslint:disable-next-line:max-line-length
  public async update(id: string, data: ILancamentoEstoque): Promise<{ result: ILancamentoEstoque, modifiedPaths: string }> {
    return null;
  }
}
