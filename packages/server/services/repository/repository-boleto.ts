// tslint:disable:max-line-length
import { Document } from "mongoose";

import mongoose = require("../../db/connection");

import { NotFoundError } from "../../errors/NotFoundError";
import { IBoletoBancario } from "../../interfaces/IBoletoBancario";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

const Boleto = mongoose.model("Boleto");

export class RepositoryBoleto implements IRepository<IBoletoBancario> {

  public async create(data: IBoletoBancario): Promise<IBoletoBancario> {
    const boleto = new Boleto(data);
    return (await boleto.save()).toObject() as IBoletoBancario;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IBoletoBancario> {
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
    const query = Boleto.find(searchValues);
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
    const boleto = await Boleto.findById(id).exec();

    if (!boleto) {
      throw new NotFoundError("Boleto não encontrado");
    }

    boleto.set({
      excluido: true,
      excluidoEm: new Date(),
    });

    await boleto.save();
    return boleto.toObject() as IBoletoBancario;
  }

  public async update(id: string, data: IBoletoBancario): Promise<{ result: IBoletoBancario, modifiedPaths: string }> {
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

}
