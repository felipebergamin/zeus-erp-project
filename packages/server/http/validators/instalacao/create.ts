import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("cliente")
    .exists().withMessage("O cliente deve ser informado")
    .isMongoId().withMessage("O _id do cliente parece inválido"),

  check("dataAgenda")
    .exists().withMessage("A instalação deve ter uma data na agenda")
    .isISO8601().withMessage("A data é inválida"),

  check("tecnicoResponsavel")
    .exists().withMessage("O técnico responsável deve ser informado")
    .isMongoId().withMessage("O _id do técnico parece inválido"),

  processValidationResult,
];
