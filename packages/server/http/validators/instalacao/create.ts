import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("cliente")
    .exists().withMessage("O cliente deve ser informado")
    .isMongoId().withMessage("O _id do cliente parece inválido"),

  check("pontoAcesso")
    .exists().withMessage("O ponto de acesso da instalação deve ser informado")
    .isMongoId().withMessage("O valor do campo é inválido"),

  check("dataAgenda")
    .exists().withMessage("A instalação deve ter uma data na agenda")
    .isISO8601().withMessage("A data é inválida"),

  check("tecnicoResponsavel")
    .exists().withMessage("O técnico responsável deve ser informado")
    .isMongoId().withMessage("O _id do técnico parece inválido"),

  check("cobrado")
    .exists().withMessage("O campo é obrigatório")
    .isBoolean().withMessage("O valor do campo é inválido"),

  check("dataPagamento")
    .optional({ checkFalsy: true })
    .isISO8601().withMessage("O formato da data de pagamento é inválido"),

  check("modoPagamento")
    .optional({ checkFalsy: true })
    .isIn(["cheque", "cartao", "dinheiro"]).withMessage("O modo de pagamento é inválido"),

  check("pago")
    .optional({ checkFalsy: true })
    .isBoolean().withMessage("O valor é inválido"),

  check("valor")
    .optional({ checkFalsy: true })
    .isFloat().withMessage("O valor pago é inválido"),

  processValidationResult,
];
