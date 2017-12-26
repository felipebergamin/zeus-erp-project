import { Request, Response } from 'express';
import Usuario = require('../../db/model/Usuario');
import { LogService as log } from '../services/LogService';

export class UsuarioController {

  public static async create(req: Request, res: Response) {
    try {
      const usuario = await new Usuario(req.body).save();
      res.json(usuario);
      log.info(`criou o usuário ${usuario.get('login')}, IP: ${req.ip}`, req.user.login, usuario.id);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      res.json(await Usuario.find({}).select('-passwd').exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const usuario = await Usuario.findById(req.params.id).select('-passwd').exec();
      res.json(usuario);
      log.info(`visualizou o usuário ${usuario.get('login')}, IP: ${req.ip}`, req.user._id, usuario.id);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const usuario = await Usuario.findById(req.params.id).exec();
      usuario.set(req.body);
      const modified = usuario.modifiedPaths();
      usuario.set('alterado_em', new Date());

      await usuario.save();
      log.info(`modificou ${modified} no usuário ${usuario.get('login')}, IP: ${req.ip}`, req.user._id, usuario.id);

      const usuobj: any = usuario.toObject();
      delete usuobj.passwd;
      res.json(usuobj);
    } catch (err) {
      res.status(400).json(err);
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
      log.info(`desativou o usuário ${usuario.get('login')}, IP: ${req.ip}`, req.user._id, usuario.id);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
