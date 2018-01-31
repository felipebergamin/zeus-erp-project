import { Request, Response } from "express";

import OLT = require("../../db/model/OLT");
import { LogService as log } from "../../services/LogService";
import { aplyGetRequestOptionsToQuery, createQueryAndApplyReqOptions, handleError } from "../utils/HttpControllers";

export class OLTController {
  public static async create(req: Request, res: Response) {
    try {
      const olt = new OLT(req.body);
      olt.set("criadoEm", new Date());
      await olt.save();
      log.info(`criou a OLT ${olt.get("nome")}, IP: ${req.ip}`, req.user._id, olt.id);
      res.send(olt);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const query = OLT.findById(req.params.id);
      aplyGetRequestOptionsToQuery(req, query);

      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const query = createQueryAndApplyReqOptions(req, OLT);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const olt = await OLT.findById(req.params.id).exec();
      await olt.remove();
      res.json(olt);
      log.info(`removeu a OLT ${olt.get("nome")}, IP: ${req.ip}`, req.user._id, olt._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const olt = await OLT.findById(req.params.id);
      olt.set(req.body);
      const modified = olt.modifiedPaths().join(", ");
      olt.set("alteradoEm", new Date());
      await olt.save();
      res.json(olt);
      log.info(`alterou ${modified} na olt ${olt.get("nome")}, IP: ${req.ip}`, req.user._id, olt.id);
    } catch (err) {
      handleError(err, res);
    }
  }
}
