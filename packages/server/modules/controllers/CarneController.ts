import { Request, Response } from 'express';
import moment = require('moment');
import Boleto = require('../../db/model/BoletoBancario');
import Carne = require('../../db/model/Carne');
import Cliente = require('../../db/model/Cliente');

export class CarneController {

  public static async create(req: Request, res: Response) {
    try {
      const cliente = await Cliente.findById(req.body.cliente);

      if (!cliente) {
        throw new Error('Cliente não informado');
      }

      const carneCriado = await new Carne(req.body).save();

      if ('parcelas' in req.body && 'valor' in req.body && 'primeiro_vencimento' in req.body) {
        const qtdParcelas = +req.body.parcelas;
        const vencimentoInicial = moment(req.body.primeiro_vencimento);

        if (!vencimentoInicial.isValid()) {
          throw new Error('A data de vencimento é inválida');
        }

        if (isNaN(qtdParcelas)) {
          throw new Error('Quantidade de parcelas deve ser um número');
        }

        const boletosDoCarne: any[] = [];

        for (let i = 0; i < qtdParcelas; i++) {
          const dataVencimento = vencimentoInicial.clone().add(i, 'months');
          if (dataVencimento.isoWeekday() === 7) {
            dataVencimento.add(1, 'days');
          }

          const boleto = {
            carne: carneCriado.id,
            cliente: req.body.cliente,
            contaBancaria: cliente.get('conta_bancaria'),
            dataVencimento,
            valorCobranca: req.body.valor,
          };

          boletosDoCarne.push(boleto);
          await (Boleto.create(boleto));
        }
      }
      res.json(carneCriado);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      res.json(await Carne.findById(req.params.id).exec());
    } catch (err) {
      res.status(400).send();
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      res.json(await Carne.find({}).exec());
    } catch (err) {
      res.status(400).send();
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const carne = await Carne.findById(req.params.id);

      if (!carne) {
        return res.end();
      }

      const boletosDoCarne = await Boleto.where('carne', carne._id).exec();

      boletosDoCarne.forEach((boleto: any) => {
        boleto.excluido_em = new Date();
        boleto.save();
      });

      carne.set('excluido_em', Date.now());
      res.json(await carne.save());

    } catch (err) {
      res.status(400).json(err);
    }
  }
}
