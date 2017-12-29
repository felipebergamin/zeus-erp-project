import { Request, Response } from "express";
import OLT = require("../../db/model/OLT");
import { LogService as log } from "../services/LogService";

export class OLTController {
  public static async create(req: Request, res: Response) {
    try {
      const olt = await new OLT(req.body).save();
      log.info(`criou a OLT ${olt.get("nome")}, IP: ${req.ip}`, req.user._id, olt.id);
      res.send(olt);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const { fields, ...queryValues} = req.query;
      const query = OLT.findById(req.params.id);

      if (fields) {
        query.select(fields.replace(",", " "));
      }
      res.json(await query.exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const { fields, ...queryValues} = req.query;
      const query = OLT.find(queryValues);

      if (fields) {
        query.select(fields.replace(",", " "));
      }
      res.json(await query.exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const olt = await OLT.findById(req.params.id).exec();
      await olt.remove();
      res.json(olt);
      log.info(`removeu a OLT ${olt.get("nome")}, IP: ${req.ip}`, req.user._id, olt._id);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const olt = await OLT.findById(req.params.id);
      olt.set(req.body);
      const modified = olt.modifiedPaths().join(", ");
      olt.set("alterado_em", new Date());
      await olt.save();
      res.json(olt);
      log.info(`alterou ${modified} na olt ${olt.get("nome")}, IP: ${req.ip}`, req.user._id, olt.id);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
