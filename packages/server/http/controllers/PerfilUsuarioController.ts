import { Request, Response } from "express";
import PerfilUsuario = require("../../db/model/PerfilUsuario");
import { LogService as log } from "../../services/LogService";
import * as utils from "../utils/HttpControllers";

export class PerfilUsuarioController {

  public static async create(req: Request, res: Response) {
    try {
      const perfil = await new PerfilUsuario(req.body).save();
      res.json(perfil);
      log.info(`criou o perfil de usuário ${perfil.get("nome")}, IP: ${req.ip}`, req.user._id, perfil.id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const query = utils.createQueryAndApplyReqOptions(req, PerfilUsuario);
      res.json(await query.exec());
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const query = PerfilUsuario.findById(req.params.id);
      utils.aplyGetRequestOptionsToQuery(req, query);
      res.json(await query.exec());
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const perfil = await PerfilUsuario.findById(req.params.id).exec();

      if (!perfil) {
        throw new Error(`O perfil com ID ${req.params.id} não existe`);
      }

      perfil.set(req.body);
      const modified = perfil.modifiedPaths().join(", ");

      await perfil.save();
      res.json(perfil);
      log.info(`alterou ${modified} no perfil ${perfil.get("nome")}, IP: ${req.ip}`, req.user._id, perfil.id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const perfil = await PerfilUsuario.findById(req.params.id).exec();
      perfil.remove();
      res.json(perfil);
      log.info(`removeu o perfil ${perfil.get("nome")}, IP: ${req.ip}`, req.user._id, perfil.id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }
}
