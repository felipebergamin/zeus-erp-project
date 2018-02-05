import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("imagemAssinatura")
    .exists().withMessage("A assinatura do cliente deve ser recolhida!")
    .isBase64().withMessage("A assinatura do cliente é inválida!"),

  check("justificativaFechamento")
    .exists().withMessage("A justificativa para o fechamento do chamado deve ser informada")
    .isLength({ min: 10 }).withMessage("A justificativa é muito curta!"),

  processValidationResult,
];
