import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("agencia.digito", "Verifique o dígito da agência")
    .exists().withMessage("O dígito da agência é necessário")
    .isInt(),

  check("agencia.numero", "Verifique o número da agência")
    .exists()
    .isInt(),

  check("carteira", "Verifique o número da carteira")
    .exists()
    .isInt(),

  check("cedente", "Verifique o cedente")
    .exists(),

  check("codigoCedente", "Verifique o código do cedente")
    .exists(),

  check("conta.digito", "Verifique o dígito da conta")
    .exists()
    .isAlphanumeric().withMessage("O dígito da conta deve ser uma letra ou número"),

  check("conta.numero", "Verifique o número da conta")
    .exists()
    .isInt(),

  check("multaDia", "Verifique a multa por dia de atraso")
    .exists()
    .isFloat(),

  check("multaVencimento", "Verifique a multa após o vencimento")
    .exists()
    .isFloat(),

  check("nome")
    .exists().withMessage("Um nome deve ser atraibuído à conta"),

  check("nossoNumero", "Verifique o nosso número informado")
    .exists()
    .isInt().withMessage("Deve ser um número inteiro válido"),

  check("proximaRemessa", "Verifique o número da próxima remessa")
    .optional({ checkFalsy: true })
    .isInt(),

  processValidationResult,
];
