import { Document } from "mongoose";

import { instanceDB } from "../../db/initConnection";
import { NotFoundError } from "../../errors/NotFoundError";
import { IArquivoRemessa } from "../../interfaces/IArquivoRemessa";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

export class RepositoryArquivoRemessa implements IRepository<IArquivoRemessa> {

  public async create(data: IArquivoRemessa): Promise<IArquivoRemessa> {
    const Remessa = (await instanceDB()).model("ArquivoRemessa");

    const remessa = new Remessa(data);
    await remessa.save();
    return remessa.toObject();
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IArquivoRemessa> {
    const Remessa = (await instanceDB()).model("ArquivoRemessa");
    const { fields, populate } = options;

    const query = Remessa.findById(id);

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec()).toObject();
  }

  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {})
    : Promise<IArquivoRemessa[]> {

    const Remessa = (await instanceDB()).model("ArquivoRemessa");
    const { fields, populate } = options;

    const query = Remessa.find(searchValues);

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec()).map((document: Document) => document.toObject());
  }

  public async remove(id: string): Promise<IArquivoRemessa> {
    throw new Error("Não é permitida a exclusão de remessas");
  }

  public async update(id: string, data: IArquivoRemessa): Promise<{ result: IArquivoRemessa, modifiedPaths: string }> {
    throw new Error("Não é permitido alterar informações de arquivos remessa");
  }

}
