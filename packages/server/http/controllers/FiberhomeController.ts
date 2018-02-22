import { Request, Response } from "express";

import { NotFoundError } from "../../errors/NotFoundError";
import { FiberhomeService } from "../../services/FiberhomeService";
import { RepositoryOLT } from "../../services/repository/repository-olt";
import { handleError } from "../utils/HttpControllers";

export class FiberhomeController {
  constructor(private repoOlt: RepositoryOLT) {}

  public async getOnuInfo(req: Request, res: Response) {
    try {
      const { olt, slot, pon, onumac } = req.query;

      const oltObj = await this.repoOlt.get(olt);

      if (!oltObj) {
        throw new NotFoundError(`OLT ${olt} não encontrada`);
      }

      const fh = await FiberhomeService.instance();
      const r = await fh.getOnuOpticalInfo(oltObj.ip, slot, pon, onumac);

      res.json(r.parsedResponse.values.pop());
    } catch (err) {
      handleError(err, res);
    }
  }

  public async getUnauthorizedOnu(req: Request, res: Response) {
    try {
      const { olt } = req.query;

      const oltObj = await this.repoOlt.get(olt);

      if (!oltObj) {
        throw new NotFoundError(`OLT ${olt} não encontrada`);
      }

      const fh = await FiberhomeService.instance();
      const r = await fh.getUnauthOnu(olt.ip);

      res.json(r.parsedResponse.values);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async addOnu(req: Request, res: Response) {
    try {
      const { NAME, OLTID, ONUID, ONUTYPE, SLOTNO, PONNO } = req.body;
      const fh = await FiberhomeService.instance();
      const r = await fh.addOnu(NAME, OLTID, ONUID, ONUTYPE, SLOTNO, PONNO);
      res.json(r.parsedResponse);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async configureOnu(req: Request, res: Response) {
    try {
      const { OLTID, ONUID, ONUPORT, PONID, PVID, VLANMOD } = req.body;
      const fh = await FiberhomeService.instance();
      const r = await fh.configureOnu(OLTID, ONUID, ONUPORT, PONID, PVID, VLANMOD);
      res.json(r.parsedResponse);
    } catch (err) {
      handleError(err, res);
    }
  }
}
