import { Request, Response } from 'express';

import { Document, DocumentQuery } from '../../db/connection';
import Cliente = require('../../db/model/Cliente');
import { LogService as log } from "../services/LogService";
import { aplyGetRequestOptionsToQuery } from "../utils/HttpControllers";

export class ClienteController {
  public static async create(req: Request, res: Response) {
    try {
      const cliente = await new Cliente(req.body).save();
      res.json(cliente);
      log.info(`cadastrou o cliente ${cliente.get("nome")}, IP: ${req.ip}`, req.user._id, cliente.id);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const query = Cliente.findById(req.params.id);
      aplyGetRequestOptionsToQuery(req, query);
      res.send(await query.exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const query = Cliente.find({ excluido_em: { $exists: false } });
      aplyGetRequestOptionsToQuery(req, query);
      res.send(await query.exec());
    } catch (err) {
      res.json(err);
    }
  }

  public static async getRemoved(req: Request, res: Response) {
    try {
      const query = Cliente.find({ excluido_em: { $exists: true } });
      aplyGetRequestOptionsToQuery(req, query);
      res.json(await query.exec());
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const cliente = await Cliente.findById(req.params.id).exec();
      cliente.set(req.body);
      const modified = cliente.modifiedPaths().join(", ");
      cliente.set("alterado_em", new Date());
      res.json(await cliente.save());
      log.info(`modificou ${modified} no cliente ${cliente.get("nome")}, IP: ${req.ip}`, req.user._id, cliente.id);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const cliente = await Cliente.findById(req.params.id).exec();
      cliente.set("excluido_em", Date.now());
      res.send(await cliente.save());
      log.info(`excluiu o cliente ${cliente.get("nome")}, IP: ${req.ip}`, req.user._id, cliente.id);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public static async undelete(req: Request, res: Response) {
    try {
      const cliente = await Cliente.findById(req.params.id);
      cliente.set("excluido_em", undefined);

      res.json(await cliente.save());
      log.info(`restaurou o cliente ${cliente.get("nome")}, IP: ${req.ip}`, req.user._id, cliente.id);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
