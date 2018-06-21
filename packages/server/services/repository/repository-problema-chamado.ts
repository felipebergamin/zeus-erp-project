import { instanceDB } from "../../db/initConnection";
import { NotFoundError } from "../../errors/NotFoundError";
import { IProblemaChamado } from "../../interfaces/IProblemaChamado";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from './utils';

export class RepositoryProblemaChamado implements IRepository<IProblemaChamado> {

  public async create(data: IProblemaChamado): Promise<IProblemaChamado> {
    const db = await instanceDB();
    const ProblemaChamado = db.model("ProblemaChamado");
    const item = await ProblemaChamado.create(data);

    return item.toObject();
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IProblemaChamado> {
    const db = await instanceDB();
    const ProblemaChamado = db.model("ProblemaChamado");
    const query = ProblemaChamado.findById(id);

    if (options.fields) {
      query.select(utils.normalizeFields(options.fields));
    }

    if (options.populate) {
      query.populate(utils.normalizePopulate(options.populate));
    }

    return (await query.exec()).toObject();
  }

  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IProblemaChamado[]> {
    const db = await instanceDB();
    const ProblemaChamado = db.model("ProblemaChamado");
    const query = ProblemaChamado.find(searchValues || {});

    if (options.fields) {
      query.select(utils.normalizeFields(options.fields));
    }
    if (options.populate) {
      query.populate(utils.normalizePopulate(options.populate));
    }

    return (await query.exec()).map((obj) => obj.toObject());
  }

  public async remove(): Promise<IProblemaChamado> {
    throw new Error("Não permitido");
  }

  public async update(id: string, data: IProblemaChamado): Promise<{ result: IProblemaChamado, modifiedPaths: string }> {
    const db = await instanceDB();
    const ProblemaChamado = db.model("ProblemaChamado");
    const obj = await ProblemaChamado.findById(id);

    if (!obj) {
      throw new NotFoundError("Item não encontrado");
    }

    obj.set(data);
    const modifiedPaths = obj.modifiedPaths().join(", ");

    return {
      modifiedPaths,
      result: (await obj.save()).toObject(),
    };
  }
}
