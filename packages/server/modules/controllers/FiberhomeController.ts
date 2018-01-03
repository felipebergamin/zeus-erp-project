import { Request, Response } from "express";
import { FiberhomeService } from "../services/FiberhomeService";

export class FiberhomeController {
  public static async getOnuInfo(req: Request, res: Response) {
    try {
      const { olt, slot, pon, onumac } = req.query;

      const fh = FiberhomeService.instance();
      const r = await fh.getOnuOpticalInfo(olt, slot, pon, onumac);
      res.json(r.parsedResponse.values.pop());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async getUnauthorizedOnu(req: Request, res: Response) {
    try {
      const { olt } = req.query;
      const fh = FiberhomeService.instance();
      const r = await fh.getUnauthOnu(olt);
      res.json(r.parsedResponse.values);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async addOnu(req: Request, res: Response) {
    try {
      const { NAME, OLTID, ONUID, ONUTYPE, SLOTNO, PONNO } = req.body;
      const fh = FiberhomeService.instance();
      const r = await fh.addOnu(NAME, OLTID, ONUID, ONUTYPE, SLOTNO, PONNO);
      res.json(r.parsedResponse);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async configureOnu(req: Request, res: Response) {
    try {
      const { OLTID, ONUID, ONUPORT, PONID, PVID, VLANMOD } = req.body;
      const fh = FiberhomeService.instance();
      const r = await fh.configureOnu(OLTID, ONUID, ONUPORT, PONID, PVID, VLANMOD);
      res.json(r.parsedResponse);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
