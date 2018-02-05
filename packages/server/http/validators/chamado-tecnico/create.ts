import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("cancelado")
    .not().exists().withMessage("Não deve ser informado manualmente"),

  check("canceladoEm")
    .not().exists().withMessage("Não deve ser informado manualmente"),

  check("canceladoPor")
    .not().exists().withMessage("Não deve ser informado manualmente"),

  check("motivoCancelamento")
    .not().exists().withMessage("Não deve ser informado manualmente"),

  check("finalizado")
    .not().exists().withMessage("Não deve ser informado manualmente"),

  check("finalizadoEm")
    .not().exists().withMessage("Não deve ser informado manualmente"),

  check("imagemAssinatura")
    .not().exists().withMessage("Não deve ser informado manualmente"),

  check("justificativaFechamento")
    .not().exists().withMessage("Não deve ser informado manualmente"),

  check("abertoPor")
    .not().exists().withMessage("Não deve ser informado manualmente"),

  check("mensagem")
    .exists().withMessage("A mensagem passada pelo cliente deve ser informada"),

  check("motivoAbertura")
    .exists().withMessage("O motivo de abertura do chamado deve ser informado"),

  check("cliente")
    .exists().withMessage("O cliente atendido pelo chamado deve ser informado")
    .isMongoId().withMessage("O cliente é inválido"),

  check("protocolo")
    .not().exists().withMessage("Não deve ser informado manualmente"),

  check("tecnico")
    .exists().withMessage("O técnico responsável pelo chamado deve ser informado")
    .isMongoId().withMessage("O técnico é inválido"),

  processValidationResult,
];
