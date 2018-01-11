import { Request, Response } from 'express';
import Usuario = require('../../db/model/Usuario');
import { LogService as log } from '../services/LogService';
import * as utils from "../utils/HttpControllers";

export class UsuarioController {

  public static async create(req: Request, res: Response) {
    try {
      const usuario = new Usuario(req.body);
      usuario.set("criadoEm", new Date());
      await usuario.save();
      res.json(usuario);
      log.info(`criou o usuário ${usuario.get('login')}, IP: ${req.ip}`, req.user.login, usuario.id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const query = utils.createQueryAndApplyReqOptions(req, Usuario);
      res.json(await Usuario.find({}).exec());
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const usuario = await Usuario.findById(req.params.id).select('-passwd').exec();
      res.json(usuario);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const usuario = await Usuario.findById(req.params.id).exec();
      usuario.set(req.body);
      const modified = usuario.modifiedPaths();
      usuario.set('alteradoEm', new Date());

      await usuario.save();
      log.info(`modificou ${modified} no usuário ${usuario.get('login')}, IP: ${req.ip}`, req.user._id, usuario.id);

      const usuobj: any = usuario.toObject();
      delete usuobj.passwd;
      res.json(usuobj);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const usuario = await Usuario.findById(req.params.id);

      usuario.set({
        ativo: !usuario.get('ativo'),
        excluido_em: new Date(),
      });

      res.json(await usuario.save());
      log.info(`${(usuario.get('ativo') ? 'ativou' : 'desativou')} o usuário ${usuario.get('login')}, IP: ${req.ip}`,
        req.user._id,
        usuario.id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }
}
