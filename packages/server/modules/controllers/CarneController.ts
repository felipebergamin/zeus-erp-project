import { Request, Response } from 'express';
import moment = require('moment');

import Boleto = require('../../db/model/BoletoBancario');
import Carne = require('../../db/model/Carne');
import Cliente = require('../../db/model/Cliente');
import { LogService as log } from "../services/LogService";
import { handleError } from "../utils/HttpControllers";

export class CarneController {

  public static async create(req: Request, res: Response) {
    try {
      const cliente = await Cliente.findById(req.body.cliente);

      if (!cliente) {
        throw new Error('Cliente não informado');
      }

      const carneCriado = await new Carne(req.body).save();

      if ('parcelas' in req.body && 'valor' in req.body && 'primeiroVencimento' in req.body) {
        const qtdParcelas = +req.body.parcelas;
        const vencimentoInicial = moment(req.body.primeiroVencimento);

        if (!vencimentoInicial.isValid()) {
          throw new Error('A data de vencimento é inválida');
        }

        if (isNaN(qtdParcelas)) {
          throw new Error('Quantidade de parcelas deve ser um número');
        }

        const boletosDoCarne: any[] = [];

        for (let i = 0; i < qtdParcelas; i++) {
          const dataVencimento = vencimentoInicial.clone().add(i, 'months');

          if (dataVencimento.isoWeekday() === 7) { // se o dia de vencimento for um domingo
            dataVencimento.add(1, 'days'); // muda o vencimento para a próxima segunda
          }

          const boleto = new Boleto({
            carne: carneCriado.id,
            cliente: req.body.cliente,
            contaBancaria: cliente.get('conta_bancaria'),
            dataVencimento,
            valorCobranca: req.body.valor,
          });

          boletosDoCarne.push(boleto);
          await boleto.save();
          log.info(`criou o boleto ${boleto.get("numeroBoleto")}, IP: ${req.ip}`, req.user._id, boleto.id);
        }
      }
      res.json(carneCriado);
      log.info(`criou o carne ${carneCriado.id}, IP: ${req.ip}`, req.user._id, carneCriado.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      res.json(await Carne.findById(req.params.id).exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      res.json(await Carne.find({}).exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const carne = await Carne.findById(req.params.id);

      if (!carne) {
        throw new Error(`não foi encontrado um carnê com o id: ${req.params.id}`);
      }

      const boletosDoCarne = await Boleto.where('carne', carne._id).exec();

      boletosDoCarne.forEach((boleto: any) => {
        boleto.set({
          excluido: true,
          excluidoEm: new Date(),
        });
        boleto.save();
        log.info(`removeu o boleto ${boleto.get("numeroBoleto")}, IP: ${req.ip}`, req.user._id, boleto.id);
      });

      carne.set('excluido_em', Date.now());
      res.json(await carne.save());
      log.info(`removeu o carnê ${carne.id}, IP: ${req.ip}`, req.user._id, carne.id);

    } catch (err) {
      handleError(err, res);
    }
  }

  public static async query(req: Request, res: Response) {
    try {
      res.json(await Carne.find(req.body).exec());
    } catch (err) {
      handleError(err, res);
    }
  }
}
