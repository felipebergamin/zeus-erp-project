import { Request, Response } from "express";

import IPPool = require("../../db/model/IPPool");
import { LogService as log } from "../../services/LogService";
import { aplyGetRequestOptionsToQuery, createQueryAndApplyReqOptions, handleError } from "../utils/HttpControllers";

export class IPPoolController {
  public static async create(req: Request, res: Response) {
    try {
      const ippool = new IPPool(req.body);
      await ippool.save();
      log.info(`criou o pool ${ippool.get("nome")}, IP: ${req.ip}`, req.user._id, ippool.id);

      res.json(ippool);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const query = IPPool.findById(req.params.id);
      aplyGetRequestOptionsToQuery(req, query);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async query(req: Request, res: Response) {
    try {
      const query = createQueryAndApplyReqOptions(req, IPPool, IPPoolController.parseQuery);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const pool = await IPPool.findById(req.params.id);
      pool.set(req.body);
      const mod = pool.modifiedPaths().join(", ");
      await pool.save();
      res.json(pool);
      log.info(`alterou ${mod} no pool ${pool.get("nome")}, IP: ${req.ip}`, req.user._id, pool.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const pool = await IPPool.findByIdAndRemove(req.params.id);
      log.info(`deletou o pool ${pool.get("nome")}, IP: ${req.ip}`, req.user._id, pool.id);
      res.json(pool);
    } catch (err) {
      handleError(err, res);
    }
  }

  private static parseQuery(query: any = {}): any {
    const { nome, ...mongoQuery } = query;

    if (nome) {
      mongoQuery.nome = new RegExp(nome, 'i');
    }

    return mongoQuery;
  }
}
