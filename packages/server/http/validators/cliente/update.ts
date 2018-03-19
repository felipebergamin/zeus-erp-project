import { Request, Response } from "express";
import { check } from "express-validator/check";

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("cpfCnpj")
    .optional({ checkFalsy: true })
    .custom(validateCPF).withMessage("Um CPF/CNPJ válido deve ser informado"),

  check("dataNascimento")
    .optional({ checkFalsy: true })
    .isISO8601().withMessage("A data de nascimento é inválida"),

  check("nome", "Verifique o nome informado")
    .optional({ checkFalsy: true })
    .isLength({ min: 10 }).withMessage("O nome é muito pequeno")
    .exists().withMessage("O nome deve ser informado"),

  check("rgIe")
    .optional({ checkFalsy: true }),

  check("tipoPessoa")
    .optional({ checkFalsy: true })
    .isIn(["fisica", "juridica"]).withMessage("Tipo de pessoa deve ser fisica/juridica"),

  check("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage("O e-mail é enválido"),

  check("numeroCelular")
    .optional({ checkFalsy: true })
    .custom((numero: string) => {
      return numero.replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/-/g, '')
        .length === 11;
    }).withMessage("O número do celular parece inválido"),

  check("telefoneFixo")
    .optional({ checkFalsy: true })
    .custom((numero: string) => {
      return numero.replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/-/g, '')
        .length === 10;
    }).withMessage("O número do telefone fixo parece inválido"),

  check("autoAtrelarMac")
    .optional({ checkFalsy: true })
    .isBoolean().withMessage("O valor é inválido"),

  check("ipAddress")
    .optional({ checkFalsy: true })
    .isIP(4).withMessage("Deve ser um IPv4 válido"),

  check("login")
    .optional({ checkFalsy: true })
    .isEmail().withMessage("O login parece inválido")
    .custom((login: string) => {
      return login.endsWith("@acetech.net.br")
        || login.endsWith("@acetech.com.br");
    }).withMessage("O login não termina com o domínio da Ace Tech"),

  check("macAddress")
    .optional({ checkFalsy: true })
    .isMACAddress().withMessage("O MAC é inválido"),

  check("olt")
    .optional({ checkFalsy: true })
    .isMongoId().withMessage("A OLT é inválida"),

  check("passwd")
    .optional({ checkFalsy: true })
    .isLength({ min: 4 }).withMessage("A senha deve ter mais de 4 dígitos"),

  check("ponNo", "Verifique a PON informada")
    .optional({ checkFalsy: true })
    .isInt(),

  check("slotNo", "Verifique o SLOT informado")
    .optional({ checkFalsy: true })
    .isInt(),

  check("plano")
    .optional({ checkFalsy: true })
    .isMongoId().withMessage("O plano é inválido"),

  check("autoBloquear")
    .optional({ checkFalsy: true })
    .isBoolean().withMessage("Valor inválido"),

  check("contaBancaria")
    .optional({ checkFalsy: true })
    .isMongoId().withMessage("O valor é inválido"),

  check("diaVencimento")
    .optional({ checkFalsy: true })
    .isInt().withMessage("O valor é inválido"),

  check("ibge")
    .optional({ checkFalsy: true })
    .isNumeric().withMessage("O cód. IBGE deve ser um valor numérico"),

  processValidationResult,
];
