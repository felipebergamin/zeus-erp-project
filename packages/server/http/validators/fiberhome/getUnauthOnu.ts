import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("olt", "A OLT informada é inválida")
    .exists()
    .isMongoId(),

  processValidationResult,
];
