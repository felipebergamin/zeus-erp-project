import { Document } from "mongoose";
import mongoose = require("../../db/connection");

import { NotFoundError } from "../../errors/NotFoundError";
import { IChamadoTecnico } from "../../interfaces/IChamadoTecnico";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

const ChamadoTecnico = mongoose.model("ChamadoTecnico");

export class RepositoryChamadoTecnico implements IRepository<IChamadoTecnico> {

  public async create(data: IChamadoTecnico): Promise<IChamadoTecnico> {
    const chamado = new ChamadoTecnico(data);
    await chamado.save();
    return chamado.toObject() as IChamadoTecnico;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IChamadoTecnico> {
    const { fields, populate } = options;
    const query = ChamadoTecnico.findById(id);

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec()).toObject() as IChamadoTecnico;
  }

  // tslint:disable-next-line:max-line-length
  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IChamadoTecnico[]> {
    const { fields, populate } = options;
    const query = ChamadoTecnico.find(searchValues);

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec())
      .map((chamado: Document) => chamado.toObject()) as IChamadoTecnico[];
  }

  public async remove(id: string): Promise<IChamadoTecnico> {
    throw new Error("Não é permitido apagar um chamado do sistema");
  }

  public async update(id: string, data: IChamadoTecnico): Promise<{ result: IChamadoTecnico, modifiedPaths: string }> {
    const chamado = await ChamadoTecnico.findById(id).exec();

    if (!chamado) {
      throw new NotFoundError(`Chamado ${id} não encontrado`);
    }

    chamado.set(data);
    const modifiedPaths = chamado.modifiedPaths().join(", ");
    await chamado.save();

    return {
      modifiedPaths,
      result: chamado.toObject() as IChamadoTecnico,
    };
  }

}
