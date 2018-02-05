import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("olt", "A OLT informada é inválida")
    .exists()
    .isMongoId(),

  check("slot", "O SLOT informado é inválido")
    .exists()
    .isInt(),

  check("pon", "A PON informada é inválida")
    .exists()
    .isInt(),

  check("onumac", "O MAC da ONU é inválido")
    .exists(),

  processValidationResult,
];
