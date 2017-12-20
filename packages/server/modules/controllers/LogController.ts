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
      res.json(await Log.find(query).sort({ dataHora: -1 }).exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  private static parseQuery(queryString: any) {
    const query = {} as any;

    if ("texto" in queryString) {
      query.$text = {
        $search: queryString.texto,
      };
    }

    if ("minDate" in queryString && "maxDate" in queryString) {
      query.dataHora = {
        $gte: queryString.minDate,
        $lte: queryString.maxDate,
      };
    }

    return query;
  }
}
