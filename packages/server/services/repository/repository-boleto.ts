// tslint:disable:max-line-length
import { Document } from "mongoose";

import { instanceDB } from "../../db/initConnection";
import { NotFoundError } from "../../errors/NotFoundError";
import { IBoletoBancario } from "../../interfaces/IBoletoBancario";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

export class RepositoryBoleto implements IRepository<IBoletoBancario> {

  public async create(data: IBoletoBancario): Promise<IBoletoBancario> {
    const Boleto = (await instanceDB()).model("BoletoBancario");
    const boleto = new Boleto(data);
    return (await boleto.save()).toObject() as IBoletoBancario;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IBoletoBancario> {
    const Boleto = (await instanceDB()).model("BoletoBancario");
    const query = Boleto.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec()).toObject() as IBoletoBancario;
  }

  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IBoletoBancario[]> {
    const Boleto = (await instanceDB()).model("BoletoBancario");
    const query = Boleto.find(this.parseQuery(searchValues));
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec())
      .map((document: Document) => document.toObject()) as IBoletoBancario[];
  }

  public async remove(id: string): Promise<IBoletoBancario> {
    const Boleto = (await instanceDB()).model("BoletoBancario");
    const boleto = await Boleto.findById(id).exec();

    if (!boleto) {
      throw new NotFoundError("Boleto não encontrado");
    }

    boleto.set({
      carne: undefined,
      excluido: true,
      excluidoEm: new Date(),
    });

    await boleto.save();
    return boleto.toObject() as IBoletoBancario;
  }

  public async update(id: string, data: IBoletoBancario): Promise<{ result: IBoletoBancario, modifiedPaths: string }> {
    const Boleto = (await instanceDB()).model("BoletoBancario");
    const boleto = await Boleto.findById(id).exec();

    if (!boleto) {
      throw new NotFoundError("Boleto não encontrado");
    }

    boleto.set(data);

    const modifiedPaths = boleto.modifiedPaths().join(", ");
    await boleto.save();

    return {
      modifiedPaths,
      result: boleto.toObject() as IBoletoBancario,
    };
  }

  private parseQuery(query: any): any {
    if (typeof query === "object") {
      if ("semCarne" in query) {
        if (query.semCarne) {
          query.carne = { $exists: false };
        }
        delete query.semCarne;
      }
    }

    return query;
  }

}
