import { Document } from "mongoose";
import mongoose = require("../../db/connection");

import { NotFoundError } from "../../errors/NotFoundError";
import { IContaBancaria } from "../../interfaces/IContaBancaria";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

const ContaBancaria = mongoose.model("ContaBancaria");

export class RepositoryContaBancaria implements IRepository<IContaBancaria> {

  public async create(data: IContaBancaria): Promise<IContaBancaria> {
    const cb = new ContaBancaria(data);
    return (await cb.save()).toObject() as IContaBancaria;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IContaBancaria> {
    const query = ContaBancaria.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec()).toObject() as IContaBancaria;
  }

  // tslint:disable-next-line:max-line-length
  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IContaBancaria[]> {
    const query = ContaBancaria.find(searchValues);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec())
      .map((cb: Document) => cb.toObject()) as IContaBancaria[];
  }

  public async remove(id: string): Promise<IContaBancaria> {
    const cb = await this.get(id);

    if (!cb) {
      throw new NotFoundError(`Conta bancária ${id} não encontrada!`);
    }

    cb.excluido = true;
    cb.excluidoEm = new Date();

    const newCb = await this.update(id, cb);
    return newCb.result;
  }

  public async update(id: string, data: IContaBancaria): Promise<{ result: IContaBancaria, modifiedPaths: string }> {
    const cb = await ContaBancaria.findById(id).exec();

    cb.set(data);
    const modifiedPaths = cb.modifiedPaths().join(", ");
    await cb.save();

    return {
      modifiedPaths,
      result: cb.toObject() as IContaBancaria,
    };
  }

}
