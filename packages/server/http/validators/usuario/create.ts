import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("email")
    .isEmail().withMessage("O e-mail parece inválido"),

  check("login")
    .exists().withMessage("O login deve ser informado")
    .isAlpha().withMessage("O login deve conter apenas letras"),

  check("nome")
    .exists().withMessage("O nome do usuário deve ser informado"),

  check("passwd")
    .exists().withMessage("Uma senha deve ser informada")
    .isLength({ min: 8 }).withMessage("A senha deve ter 8 caracteres ou mais"),

  check("perfil")
    .exists().withMessage("O perfil do usuário deve ser informado")
    .isMongoId().withMessage("O perfil do usuário parece ser inválido"),

  check("telegramID")
    .optional({ checkFalsy: true })
    .isInt().withMessage("Telegram ID inválido"),

  check("tipo")
    .exists().withMessage("O tipo de usuário ")
    .isIn([ "tecnico", "atendente", "gerente", "outro" ]).withMessage("Valor inválido"),

  processValidationResult,
];
