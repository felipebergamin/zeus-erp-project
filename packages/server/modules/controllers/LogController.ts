import { Request, Response } from "express";
import Log = require("../../db/model/Log");

export class LogController {
  public static async get(req: Request, res: Response) {
    try {
      res.json(await Log.findById(req.params.id).populate("usuario").exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async query(req: Request, res: Response) {
    const query = LogController.parseQuery(req.query);

    try {
      res.json(await Log.find(query).populate("usuario").sort({ dataHora: -1 }).exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  private static parseQuery(query: any = {}) {
    for (const property in query) {
      if (query[property] === 'null' || query[property] == null || query[property] === '') {
        delete query[property];
      }
    }

    if ("texto" in query) {
      query.$text = {
        $search: query.texto,
      };
      delete query.texto;
    }

    if ("minDate" in query && "maxDate" in query) {
      query.dataHora = {
        $gte: query.minDate,
        $lte: query.maxDate,
      };
      delete query.minDate;
      delete query.maxDate;
    }

    return query;
  }
}
