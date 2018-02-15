import mongoose = require("../db/connection");

import { ICliente } from "../interfaces/ICliente";
import { IRepository } from "../interfaces/IRepository";
import * as utils from "./utils";

const Cliente = mongoose.model("Cliente");

export class RepositoryCliente implements IRepository<ICliente> {

  public async create(data: ICliente): Promise<ICliente> {
    const cliente = new Cliente(data);
    return (await cliente.save()).toObject() as ICliente;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<ICliente> {
    const query = Cliente.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec()).toObject() as ICliente;
  }

  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<ICliente[]> {
    const query = Cliente.find(searchValues);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec())
      .map((doc: mongoose.Document) => doc.toObject()) as ICliente[];
  }

  public async remove(id: string): Promise<ICliente> {
    const cliente = await Cliente.findById(id).exec();

    cliente.set({
      excluido: true,
      excluidoEm: new Date(),
    });

    return (await cliente.save()).toObject() as ICliente;
  }

  public async update(id: string, data: ICliente): Promise<{result: ICliente, modifiedPaths: string}> {
    const cliente = await Cliente.findById(id).exec();
    cliente.set(data);
    const modifiedPaths = cliente.modifiedPaths().join(", ");
    cliente.set("alteradoEm", new Date());

    await cliente.save();

    return {
      modifiedPaths,
      result: cliente.toObject() as ICliente,
    };
  }

}
