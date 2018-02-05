import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("cliente")
    .exists().withMessage("O cliente atendido pelo chamado deve ser informado")
    .isMongoId().withMessage("O cliente é inválido"),

  check("mensagem")
    .exists().withMessage("A mensagem passada pelo cliente deve ser informada"),

  check("motivoAbertura")
    .exists().withMessage("O motivo de abertura do chamado deve ser informado"),

  check("tecnico")
    .exists().withMessage("O técnico responsável pelo chamado deve ser informado")
    .isMongoId().withMessage("O técnico é inválido"),

  processValidationResult,
];