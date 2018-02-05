import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("NAME", "O nome da ONU é inválido")
    .exists()
    .isAlpha("pt-BR"),

  check("OLTID", "Deve ser informado um endereço ipv4 para a OLT")
    .exists()
    .isIP(4),

  check("ONUID", "A ONU informada é inválida")
    .exists(),

  check("ONUTYPE", "O tipo da ONU é inválido")
    .exists(),

  check("SLOTNO", "Deve ser informado um SLOT válido")
    .exists()
    .isInt(),

  check("PONNO", "Uma PON válida deve ser informada")
    .exists()
    .isInt(),

  processValidationResult,
];
