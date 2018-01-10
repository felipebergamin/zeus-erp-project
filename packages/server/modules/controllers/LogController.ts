import { Request, Response } from "express";
import Log = require("../../db/model/Log");
import { aplyGetRequestOptionsToQuery, createQueryAndApplyReqOptions, handleError } from "../utils/HttpControllers";

export class LogController {
  public static async get(req: Request, res: Response) {
    try {
      const query = Log.findById(req.params.id);
      aplyGetRequestOptionsToQuery(req, query);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async query(req: Request, res: Response) {
    try {
      const query = createQueryAndApplyReqOptions(req, Log, LogController.parseQuery);
      query.populate("usuario", "login");
      query.sort({ dataHora: -1 });

      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
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
