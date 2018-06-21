import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("imagemAssinatura")
    .exists().withMessage("A assinatura do cliente deve ser recolhida!")
    .isBase64().withMessage("A assinatura do cliente é inválida!"),

  check("observacoesTecnico")
    .optional({ checkFalsy: true })
    .isLength({ min: 10 }).withMessage("A justificativa é muito curta!"),

  check("problema")
    .exists().withMessage("O problema deve ser informado")
    .isMongoId().withMessage("O valor do campo 'problema' é inválido"),

  processValidationResult,
];
