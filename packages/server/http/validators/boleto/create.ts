import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("carne")
    .optional()
    .isMongoId().withMessage("O carnê do boleto é inválido"),

  check("cliente", "Verifique o cliente informado como pagador")
    .exists().withMessage("O boleto deve ser associado à um cliente")
    .isMongoId(),

  check("contaBancaria", "O boleto deve ser associado a uma conta bancária válida")
    .optional()
    .isMongoId(),

  check("dataPagamento")
    .not().exists().withMessage("Um novo boleto não deve ter data a data em que foi pago"),

  check("dataVencimento")
    .exists().withMessage("O boleto deve ter data de vencimento")
    .isISO8601().withMessage("Deve ser uma data válida"),

  check("enviadoRemessa")
    .not().exists().withMessage("Não deve ser definido no cadastro do boleto"),

  check("excluido")
    .not().exists().withMessage("Não deve ser definido no cadastro do boleto"),

  check("excluidoEm")
    .not().exists().withMessage("Não deve ser definido no cadastro do boleto"),

  check("ocorrencias")
    .not().exists().withMessage("Não deve ser definido no cadastro do boleto"),

  check("pago")
    .not().exists().withMessage("Não deve ser definido no cadastro do boleto"),

  check("valorCobranca")
    .exists().withMessage("Valor do boleto deve ser especificado")
    .isFloat().withMessage("Valor do boleto inválido"),

  check("valorPago")
    .not().exists().withMessage("Não deve ser definido no cadastro do boleto"),

  processValidationResult,
];
