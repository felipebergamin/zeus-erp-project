import { Document } from "mongoose";
import mongoose = require("../../db/connection");

import { instanceDB } from "../../db/initConnection";
import { NotFoundError } from "../../errors/NotFoundError";
import { IRepository } from "../../interfaces/IRepository";
import { IUsuario } from "../../interfaces/IUsuario";
import * as utils from "./utils";

export class RepositoryUsuario implements IRepository<IUsuario> {

  public async create(data: IUsuario): Promise<IUsuario> {
    const Usuario = (await instanceDB()).model("Usuario");
    const usuario = new Usuario(data);
    return (await usuario.save()).toObject() as IUsuario;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IUsuario> {
    const Usuario = (await instanceDB()).model("Usuario");
    const query = Usuario.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    const usuario = await query.exec();

    if (!usuario) {
      return null;
    }

    return usuario.toObject() as IUsuario;
  }

  // tslint:disable-next-line:max-line-length
  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IUsuario[]> {
    const Usuario = (await instanceDB()).model("Usuario");
    const query = Usuario.find(searchValues);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec())
      .map((usuario: Document) => usuario.toObject()) as IUsuario[];
  }

  public async remove(id: string): Promise<IUsuario> {
    const Usuario = (await instanceDB()).model("Usuario");
    const usuario = await Usuario.findById(id).exec();
    usuario.set({
      ativo: false,
      excluidoEm: new Date(),
    });
    await usuario.save();
    return usuario.toObject() as IUsuario;
  }

  public async recover(id: string): Promise<IUsuario> {
    const Usuario = (await instanceDB()).model("Usuario");
    const usuario = await Usuario.findById(id).exec();
    usuario.set({
      ativo: true,
      excluidoEm: undefined,
    });
    await usuario.save();
    return usuario.toObject() as IUsuario;
  }

  public async update(id: string, data: IUsuario): Promise<{ result: IUsuario, modifiedPaths: string }> {
    const Usuario = (await instanceDB()).model("Usuario");
    const usuario = await Usuario.findById(id).exec();

    if (!usuario) {
      throw new NotFoundError(`Usuario ${id} não encontrado`);
    }

    usuario.set(data);
    const modifiedPaths = usuario.modifiedPaths().join(", ");
    await usuario.save();

    return {
      modifiedPaths,
      result: usuario.toObject() as IUsuario,
    };
  }

  public async auth(login: string, passwd: string): Promise<IUsuario | boolean> {
    const Usuario: any = (await instanceDB()).model("Usuario");
    const usuario = await Usuario.findOne({ login }).populate('perfil').exec();

    if (usuario && usuario.get("ativo")) {
      if (await usuario.checkPasswd(passwd)) {
        return usuario.toObject();
      }
    }

    return false;
  }
}
