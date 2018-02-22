import { Document } from "mongoose";

import { instanceDB } from "../../db/initConnection";
import { NotFoundError } from "../../errors/NotFoundError";
import { IPlano } from "../../interfaces/IPlano";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

export class RepositoryPlano implements IRepository<IPlano> {

  public async create(data: IPlano): Promise<IPlano> {
    const Plano = (await instanceDB()).model("Plano");
    const plano = new Plano(data);
    return (await plano.save()).toObject() as IPlano;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IPlano> {
    const Plano = (await instanceDB()).model("Plano");
    const query = Plano.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    const plano = await query.exec();

    if (!plano) {
      return null;
    }

    return plano.toObject() as IPlano;
  }

  // tslint:disable-next-line:max-line-length
  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IPlano[]> {
    const Plano = (await instanceDB()).model("Plano");
    const query = Plano.find(searchValues);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec())
      .map((plano: Document) => plano.toObject()) as IPlano[];
  }

  public async remove(id: string): Promise<IPlano> {
    const Plano = (await instanceDB()).model("Plano");
    const plano = await Plano.findByIdAndRemove(id).exec();
    return plano.toObject() as IPlano;
  }

  public async update(id: string, data: IPlano): Promise<{ result: IPlano, modifiedPaths: string }> {
    const Plano = (await instanceDB()).model("Plano");
    const plano = await Plano.findById(id).exec();

    if (!plano) {
      throw new NotFoundError(`Plano ${id} não encontrado`);
    }

    plano.set(data);
    const modifiedPaths = plano.modifiedPaths().join(", ");
    await plano.save();

    return {
      modifiedPaths,
      result: plano.toObject() as IPlano,
    };
  }
}
