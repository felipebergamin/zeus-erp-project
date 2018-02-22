import { Document } from "mongoose";

import { instanceDB } from "../../db/initConnection";
import { NotFoundError } from "../../errors/NotFoundError";
import { IPerfilUsuario } from "../../interfaces/IPerfilUsuario";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

export class RepositoryPerfilUsuario implements IRepository<IPerfilUsuario> {

  public async create(data: IPerfilUsuario): Promise<IPerfilUsuario> {
    const PerfilUsuario = (await instanceDB()).model("PerfilUsuario");
    const perfil = new PerfilUsuario(data);
    await perfil.save();
    return perfil.toObject() as IPerfilUsuario;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IPerfilUsuario> {
    const PerfilUsuario = (await instanceDB()).model("PerfilUsuario");
    const query = PerfilUsuario.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    const perfil = await query.exec();

    if (!perfil) {
      return null;
    }

    return perfil.toObject() as IPerfilUsuario;
  }

  // tslint:disable-next-line:max-line-length
  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IPerfilUsuario[]> {
    const PerfilUsuario = (await instanceDB()).model("PerfilUsuario");
    const query = PerfilUsuario.find(searchValues);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec())
      .map((perfil: Document) => perfil.toObject()) as IPerfilUsuario[];
  }

  public async remove(id: string): Promise<IPerfilUsuario> {
    const PerfilUsuario = (await instanceDB()).model("PerfilUsuario");
    const perfil = await PerfilUsuario.findByIdAndRemove(id).exec();
    return perfil.toObject() as IPerfilUsuario;
  }

  public async update(id: string, data: IPerfilUsuario): Promise<{ result: IPerfilUsuario, modifiedPaths: string }> {
    const PerfilUsuario = (await instanceDB()).model("PerfilUsuario");
    const perfil = await PerfilUsuario.findById(id).exec();

    if (!perfil) {
      throw new NotFoundError(`Perfil ${id} não encontrado`);
    }

    perfil.set(data);
    const modifiedPaths = perfil.modifiedPaths().join(", ");
    await perfil.save();

    return {
      modifiedPaths,
      result: perfil.toObject() as IPerfilUsuario,
    };
  }

}
