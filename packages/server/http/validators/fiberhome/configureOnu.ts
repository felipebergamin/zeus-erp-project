import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("OLTID", "Um endereço IPv4 deve ser informado para a OLT")
    .exists()
    .isIP(4),

  check("ONUID", "O MAC da ONU deve ser informado")
    .exists(),

  check("ONUPORT", "Verifique a porta da ONU informada")
    .exists()
    .matches(/NA-NA-NA-\d/).withMessage("Porta da ONU informada em formato inválido"),

  check("PONID", "Verifique a PON do chassi informada")
    .exists()
    .matches(/NA-NA-\d-\d/).withMessage("Porta PON informada em formato inválido"),

  check("PVID", "Verifique a VLAN informada para configuração")
    .exists()
    .isInt(),

  check("VLANMOD", "Verifique o modo de VLAN informado")
    .exists(),

  processValidationResult,
];
