import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("descricao")
    .exists().withMessage("A descrição do plano é obrigatória"),

  check("nome")
    .exists().withMessage("O nome do plano é obrigatório"),

  check("valorMensal")
    .exists().withMessage("O valor do plano é obrigatório")
    .isFloat().withMessage("Deve ser um valor monetário válido"),

  check("velocidadeDownload")
    .exists().withMessage("A velocidade de download do plano deve ser informada")
    .isInt().withMessage("Deve ser um número inteiro"),

  check("velocidadeUpload")
    .exists().withMessage("A velocidade de upload deve ser informada")
    .isInt().withMessage("Deve ser um número inteiro"),

  processValidationResult,
];
