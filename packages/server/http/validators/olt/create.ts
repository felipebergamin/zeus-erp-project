import { Request, Response } from "express";
import { check } from "express-validator/check";
import nodeip = require("ip");

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("ip")
    .exists().withMessage("O IP deve ser informado")
    .isIP(4).withMessage("O IP é inválido"),

  check("nome")
    .exists().withMessage("Um nome deve ser informado"),

  processValidationResult,
];
