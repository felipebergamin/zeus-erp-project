import { Document } from "mongoose";
import mongoose = require("../../db/connection");

import { NotFoundError } from "../../errors/NotFoundError";
import { IOLT } from "../../interfaces/IOLT";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

const OLT = mongoose.model("OLT");

export class RepositoryOLT implements IRepository<IOLT> {

  public async create(data: IOLT): Promise<IOLT> {
    const olt = new OLT(data);
    await olt.save();

    return olt.toObject() as IOLT;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IOLT> {
    const query = OLT.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    const olt = await query.exec();

    if (!olt) {
      throw new NotFoundError(`OLT ${id} não encontrada`);
    }

    return olt.toObject() as IOLT;
  }

  // tslint:disable-next-line:max-line-length
  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IOLT[]> {
    const query = OLT.find(searchValues);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec())
      .map((olt: Document) => olt.toObject()) as IOLT[];
  }

  public async remove(id: string): Promise<IOLT> {
    const olt = await OLT.findByIdAndRemove(id).exec();
    return olt.toObject() as IOLT;
  }

  public async update(id: string, data: IOLT): Promise<{ result: IOLT, modifiedPaths: string }> {
    const olt = await OLT.findById(id).exec();

    if (!olt) {
      throw new NotFoundError(`OLT ${id} não encontrada`);
    }

    olt.set(data);
    const modifiedPaths = olt.modifiedPaths().join(", ");
    await olt.save();

    return {
      modifiedPaths,
      result: olt.toObject() as IOLT,
    };
  }

}
