import { Document } from "mongoose";
import mongoose = require("../../db/connection");

import { NotFoundError } from "../../errors/NotFoundError";
import { IIPPool } from "../../interfaces/IIPPool";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

const IPPool = mongoose.model("IPPool");

export class RepositoryIPPool implements IRepository<IIPPool> {

  public async create(data: IIPPool): Promise<IIPPool> {
    const pool = new IPPool(data);
    await pool.save();

    return pool.toObject() as IIPPool;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IIPPool> {
    const query = IPPool.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    const pool = await query.exec();

    if (!pool) {
      throw new NotFoundError(`Pool ${id} não encontrado`);
    }

    return pool.toObject() as IIPPool;
  }

  // tslint:disable-next-line:max-line-length
  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IIPPool[]> {
    const query = IPPool.find(searchValues);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec())
      .map((pool: Document) => pool.toObject()) as IIPPool[];
  }

  public async remove(id: string): Promise<IIPPool> {
    const pool = await IPPool.findByIdAndRemove(id).exec();
    return pool.toObject() as IIPPool;
  }

  public async update(id: string, data: IIPPool): Promise<{ result: IIPPool, modifiedPaths: string }> {
    const pool = await IPPool.findById(id).exec();

    if (!pool) {
      throw new NotFoundError(`Pool ${id} não encontrado`);
    }

    pool.set(data);
    const modifiedPaths = pool.modifiedPaths().join(", ");
    await pool.save();

    return {
      modifiedPaths,
      result: pool.toObject() as IIPPool,
    };
  }

}
