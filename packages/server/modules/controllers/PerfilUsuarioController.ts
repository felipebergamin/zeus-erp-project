import { Request, Response } from "express";
import PerfilUsuario = require("../../db/model/PerfilUsuario");
import { LogService as log } from "../services/LogService";

export class PerfilUsuarioController {

  public static async create(req: Request, res: Response) {
    try {
      const perfil = await new PerfilUsuario(req.body).save();
      res.json(perfil);
      log.info(`criou o perfil de usuário ${perfil.get('nome')}, IP: ${req.ip}`, req.user._id, perfil.id);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      res.json(await PerfilUsuario.find(req.query).exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      res.json(await PerfilUsuario.findById(req.params.id).exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const perfil = await PerfilUsuario.findById(req.params.id).exec();

      if (perfil) {
        perfil.set(req.body);
        const modified = perfil.modifiedPaths().join(', ');

        await perfil.save();
        log.info(`alterou ${modified} no perfil ${perfil.get('nome')}, IP: ${req.ip}`, req.user._id, perfil.id);
      }

      res.json(perfil);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const perfil = await PerfilUsuario.findById(req.params.id).exec();
      perfil.remove();
      res.json(perfil);
      log.info(`removeu o perfil ${perfil.get('nome')}, IP: ${req.ip}`, req.user._id, perfil.id);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
