import { instanceDB } from "../../db/initConnection";
import { IItemEstoque } from "../../interfaces/IItemEstoque";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from './utils';

export class RepositoryItemEstoque implements IRepository<IItemEstoque> {

  public async create(data: IItemEstoque|IItemEstoque[]): Promise<IItemEstoque> {
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
      query.select(utils.normalizeFields(fields));
    }

    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec()).map((el) => el.toObject());
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

  public async baixaItem(itemId: string, quantidade: number): Promise<IItemEstoque> {
    const ItemEstoque = (await instanceDB()).model('ItemEstoque');

    const query = ItemEstoque.findByIdAndUpdate(itemId, {
      $inc: {
        quantidade: (quantidade > 0 ? -quantidade : quantidade),
      },
    });

    const result = await query.exec();
    return result.toObject();
  }

  public async lancarItem(itemId: string, quantidade: number): Promise<IItemEstoque> {
    const ItemEstoque = (await instanceDB()).model('ItemEstoque');

    const query = ItemEstoque.findByIdAndUpdate(itemId, {
      $inc: {
        quantidade: (quantidade > 0 ? quantidade : -quantidade),
      },
    });

    return (await query.exec()).toObject();
  }
}
