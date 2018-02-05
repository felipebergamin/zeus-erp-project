import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("cliente")
    .exists().withMessage("O carnê deve estar associado a um cliente"),

  check("descricao")
    .exists().withMessage("O carnê deve ter uma descrição"),

  check("parcelas")
    .exists().withMessage("A quantidade de parcelas deve ser informada")
    .isInt().withMessage("A quantidade de parcelas deve ser informada como um número inteiro"),

  check("valor")
    .exists().withMessage("O valor das parcelas deve ser informado")
    .isFloat().withMessage("Valor inválido, deve ser um número decimal"),

  check("primeiroVencimento")
    .exists().withMessage("A data do primeiro vencimento deve ser informada")
    .isISO8601().withMessage("Formato inválido para data no primeiro vencimento"),

  processValidationResult,
];
