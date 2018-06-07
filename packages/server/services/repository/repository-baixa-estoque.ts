import { instanceDB } from "../../db/initConnection";
import { IBaixaEstoque } from "../../interfaces/IBaixaEstoque";
import { IRepository } from "../../interfaces/IRepository";
import { RepositoryItemEstoque } from "./repository-item-estoque";
import * as utils from './utils';

import { inspect } from 'util';

export class RepositoryBaixaEstoque implements IRepository<IBaixaEstoque> {

  public async create(data: IBaixaEstoque|IBaixaEstoque[]): Promise<IBaixaEstoque> {
    const BaixaEstoque = (await instanceDB()).model('BaixaEstoque');
    const baixa = (await new BaixaEstoque(data).save()).toObject() as IBaixaEstoque;

    return baixa;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IBaixaEstoque> {
    const BaixaEstoque = (await instanceDB()).model('BaixaEstoque');
    const query = BaixaEstoque.findById(id);
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
  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IBaixaEstoque[]> {
    const BaixaEstoque = (await instanceDB()).model('BaixaEstoque');

    const query = BaixaEstoque.find(searchValues);
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

  public async remove(id: string): Promise<IBaixaEstoque> {
    const BaixaEstoque = (await instanceDB()).model('BaixaEstoque');
    const baixa = (await BaixaEstoque.findByIdAndRemove(id).exec()).toObject();

    return baixa;
  }

  public async update(id: string, data: IBaixaEstoque): Promise<{ result: IBaixaEstoque, modifiedPaths: string }> {
    return null;
  }
}
