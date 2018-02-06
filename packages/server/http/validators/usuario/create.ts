import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("email")
    .isEmail().withMessage("O e-mail parece inválido"),

  check("login")
    .exists().withMessage("O login deve ser informado")
    .isAlpha(),

  check("nome")
    .exists().withMessage("O nome do usuário deve ser informado"),

  check("passwd")
    .exists()
    .isLength({ min: 8 }).withMessage("A senha deve ter 8 caracteres ou mais"),

  check("perfil")
    .exists()
    .isMongoId(),

  check("telegramID")
    .optional({ checkFalsy: true })
    .isInt(),

  check("tipo")
    .exists()
    .isIn([ "tecnico", "atendente", "gerente", "outro" ]),

  processValidationResult,
];
