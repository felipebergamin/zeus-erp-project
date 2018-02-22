import { Document } from "mongoose";

import { instanceDB } from "../../db/initConnection";
import { NotFoundError } from "../../errors/NotFoundError";
import { IChamadoTecnico } from "../../interfaces/IChamadoTecnico";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

export class RepositoryChamadoTecnico implements IRepository<IChamadoTecnico> {

  public async create(data: IChamadoTecnico): Promise<IChamadoTecnico> {
    const ChamadoTecnico = (await instanceDB()).model("ChamadoTecnico");
    const chamado = new ChamadoTecnico(data);
    await chamado.save();
    return chamado.toObject() as IChamadoTecnico;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IChamadoTecnico> {
    const ChamadoTecnico = (await instanceDB()).model("ChamadoTecnico");
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
    const ChamadoTecnico = (await instanceDB()).model("ChamadoTecnico");
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
    const ChamadoTecnico = (await instanceDB()).model("ChamadoTecnico");
    const chamado = await ChamadoTecnico.findById(id).exec();

    const {
      alteradoEm,
      criadoEm,
      cancelado,
      canceladoEm,
      canceladoPor,
      motivoCancelamento,
      finalizado,
      finalizadoEm,
      imagemAssinatura,
      justificativaFechamento,
      abertoPor,
      cliente,
      protocolo,
      ...newData, // apenas as propriedades restantes podem ser modificadas
    } = data;

    if (!chamado) {
      throw new NotFoundError(`Chamado ${id} não encontrado`);
    }

    chamado.set(newData);

    if (!chamado.isModified()) {
      return null;
    }
    const modifiedPaths = chamado.modifiedPaths().join(", ");

    await chamado.save();

    return {
      modifiedPaths,
      result: chamado.toObject() as IChamadoTecnico,
    };
  }

  public async cancel(id: string, motivoCancelamento: string, canceladoPor: string): Promise<IChamadoTecnico> {
    const ChamadoTecnico = (await instanceDB()).model("ChamadoTecnico");
    const chamado = await ChamadoTecnico.findById(id).exec();

    if (!chamado) {
      throw new NotFoundError(`Chamado ${id} não encontrado`);
    }

    if (chamado.get("finalizado")) {
      throw new Error("Impossível cancelar um chamado finalizado");
    }
    if (chamado.get("cancelado")) {
      throw new Error("O chamado já foi cancelado");
    }

    chamado.set({
      cancelado: true,
      canceladoEm: new Date(),
      canceladoPor,
      motivoCancelamento,
    });

    return (await chamado.save()).toObject() as IChamadoTecnico;
  }

  public async finalize(id: string, imagemAssinatura: string, justificativaFechamento: string):
    Promise<IChamadoTecnico> {

    const ChamadoTecnico = (await instanceDB()).model("ChamadoTecnico");
    const chamado = await ChamadoTecnico.findById(id).exec();

    if (!chamado) {
      throw new NotFoundError(`Chamado ${id} não encontrado`);
    }

    if (chamado.get("finalizado")) {
      throw new Error("Chamado já finalizado");
    }
    if (chamado.get("cancelado")) {
      throw new Error("Impossível finalizar um chamado cancelado");
    }

    chamado.set({
      finalizado: true,
      finalizadoEm: new Date(),
      imagemAssinatura,
      justificativaFechamento,
    });

    return (await chamado.save()).toObject() as IChamadoTecnico;
  }

}
