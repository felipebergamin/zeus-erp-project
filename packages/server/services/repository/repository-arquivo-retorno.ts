import { Document } from "mongoose";

import { instanceDB } from "../../db/initConnection";
import { NotFoundError } from "../../errors/NotFoundError";
import { IArquivoRetorno } from "../../interfaces/IArquivoRetorno";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

export class RepositoryArquivoRetorno implements IRepository<IArquivoRetorno> {

  public async create(data: IArquivoRetorno): Promise<IArquivoRetorno> {
    const Retorno = (await instanceDB()).model("ArquivoRetorno");

    const retorno = new Retorno(data);
    await retorno.save();
    return retorno.toObject();
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IArquivoRetorno> {
    const Retorno = (await instanceDB()).model("ArquivoRetorno");
    const { fields, populate } = options;

    const query = Retorno.findById(id);

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec()).toObject();
  }

  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {})
    : Promise<IArquivoRetorno[]> {

    const Retorno = (await instanceDB()).model("ArquivoRetorno");
    const { fields, populate } = options;

    const query = Retorno.find(searchValues);

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec()).map((document: Document) => document.toObject());
  }

  public async remove(id: string): Promise<IArquivoRetorno> {
    throw new Error("Não é permitida a exclusão de remessas");
  }

  public async update(id: string, data: IArquivoRetorno): Promise<{ result: IArquivoRetorno, modifiedPaths: string }> {
    throw new Error("Não é permitido alterar informações de arquivos remessa");
  }

}
