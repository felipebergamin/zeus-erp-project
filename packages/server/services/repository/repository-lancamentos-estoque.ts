import { Types } from 'mongoose';
import { inspect } from "util";

import { instanceDB } from "../../db/initConnection";
import { ILancamentoEstoque } from "../../interfaces/ILancamentoEstoque";
import { IRepository } from "../../interfaces/IRepository";
import { LogService as log } from '../LogService';
import { RepositoryItemEstoque } from "./repository-item-estoque";
import * as utils from './utils';

export class RepositoryLancamentosEstoque implements IRepository<ILancamentoEstoque> {

  public async create(data: ILancamentoEstoque | ILancamentoEstoque[]): Promise<ILancamentoEstoque> {
    const LancamentoEstoque = (await instanceDB()).model('LancamentoEstoque');
    const lancamento = await LancamentoEstoque.create(data);

    return lancamento.toObject();
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
  public async getAll(searchValues?: any, options: { fields?: string, populate?: string } = {}): Promise<ILancamentoEstoque[]> {
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

    return baixa;
  }

  /**
   * Faz um aggregation e soma todos os lancamentos de cada item no estoque
   */
  public async summarizeAndGetSum(query: any = {}) {
    const LancamentoEstoque = (await instanceDB()).model('LancamentoEstoque');

    const result = await LancamentoEstoque.aggregate([
      { $match: query },
      { $unwind: "$itens" },
      { $match: query },
      {
        $group: {
          _id: "$itens.item",
          total: { $sum: "$itens.quantidade" },
        },
      },
    ]);

    return result;
  }

  public async summarizeAndGetSumOfItem(id: string) {
    return await this.summarizeAndGetSum({ "itens.item": new Types.ObjectId(id) });
  }

  // tslint:disable-next-line:max-line-length
  public async update(id: string, data: ILancamentoEstoque): Promise<{ result: ILancamentoEstoque, modifiedPaths: string }> {
    return null;
  }
}
