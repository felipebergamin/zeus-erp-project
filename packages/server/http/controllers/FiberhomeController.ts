import { Request, Response } from "express";

import OLT = require("../../db/model/OLT");
import { FiberhomeService } from "../../services/FiberhomeService";
import { handleError } from "../utils/HttpControllers";

export class FiberhomeController {
  public static async getOnuInfo(req: Request, res: Response) {
    try {
      const { olt, slot, pon, onumac } = req.query;

      const oltObj = await OLT.findById(olt).exec();

      if (!oltObj) {
        return res.status(404).json({ message: "OLT não encontrada no sistema" });
      }

      const fh = await FiberhomeService.instance();
      const r = await fh.getOnuOpticalInfo(oltObj.get("ip"), slot, pon, onumac);

      res.json(r.parsedResponse.values.pop());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async getUnauthorizedOnu(req: Request, res: Response) {
    try {
      const { olt } = req.query;

      const oltObj = await OLT.findById(olt).exec();
      const fh = await FiberhomeService.instance();
      const r = await fh.getUnauthOnu(olt.ip);

      res.json(r.parsedResponse.values);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async addOnu(req: Request, res: Response) {
    try {
      const { NAME, OLTID, ONUID, ONUTYPE, SLOTNO, PONNO } = req.body;
      const fh = await FiberhomeService.instance();
      const r = await fh.addOnu(NAME, OLTID, ONUID, ONUTYPE, SLOTNO, PONNO);
      res.json(r.parsedResponse);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async configureOnu(req: Request, res: Response) {
    try {
      const { OLTID, ONUID, ONUPORT, PONID, PVID, VLANMOD } = req.body;
      const fh = await FiberhomeService.instance();
      const r = await fh.configureOnu(OLTID, ONUID, ONUPORT, PONID, PVID, VLANMOD);
      res.json(r.parsedResponse);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
