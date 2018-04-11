import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("carne")
    .optional()
    .isMongoId().withMessage("O carnê do boleto é inválido"),

  check("cliente", "Verifique o cliente informado como pagador")
    .not().exists().withMessage("O cliente não pode ser alterado após o boleto ser emitido"),

  check("contaBancaria", "O boleto deve ser associado a uma conta bancária válida")
    .not().exists().withMessage("A conta bancária não pode ser alterada após o boleto ser emitido")
    .isMongoId(),

  check("dataPagamento")
    .not().exists().withMessage("Esta propriedade não deve ser especificada manualmente"),

  check("dataVencimento")
    .optional()
    .isISO8601().withMessage("Deve ser uma data válida"),

  check("registrado")
    .not().exists().withMessage("Esta propriedade não deve ser especificada manualmente"),

  check("excluido")
    .not().exists().withMessage("Esta propriedade não deve ser especificada manualmente"),

  check("excluidoEm")
    .not().exists().withMessage("Esta propriedade não deve ser especificada manualmente"),

  check("ocorrencias")
    .not().exists().withMessage("Esta propriedade não deve ser especificada manualmente"),

  check("pago")
    .not().exists().withMessage("Esta propriedade não deve ser especificada manualmente"),

  check("valorCobranca")
    .optional()
    .isFloat().withMessage("Valor do boleto inválido"),

  check("valorPago")
    .not().exists().withMessage("Esta propriedade não deve ser especificada manualmente"),

  processValidationResult,
];
