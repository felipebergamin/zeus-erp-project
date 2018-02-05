import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("motivoCancelamento")
    .exists().withMessage("O motivo do cancelamento deve ser informado")
    .isLength({ min: 10 }).withMessage("A justificativa de cancelamento é muito curta!"),

  processValidationResult,
];
