import { Request, Response } from 'express';
import moment = require('moment');

import { LogService as log } from "../../services/LogService";
import * as utils from "../utils/HttpControllers";

import { RepositoryCarne } from '../../services/repository/repository-carne';

export class CarneController {

  constructor(
    private repoCarne: RepositoryCarne,
  ) {}

  public async create(req: Request, res: Response) {
    try {
      const carne = await this.repoCarne.create(req.body);
      log.info(`criou o carne ${carne._id}, IP: ${req.ip}`, req.user._id, carne._id);
      res.json(carne);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { fields, populate } = req.query;
      const carne = await this.repoCarne.get(req.params.id, { fields, populate });
      res.json(carne);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const carnes = await this.repoCarne.getAll(search, { fields, populate });
      res.json(carnes);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async remove(req: Request, res: Response) {
    try {
      const carneRemovido = await this.repoCarne.remove(req.params.id);
      log.info(`removeu o carnê ${carneRemovido._id}, IP: ${req.ip}`, req.user._id, carneRemovido._id);
      res.json(carneRemovido);
    } catch (err) {
      utils.handleError(err, res);
    }
  }
}
