import { Request, Response } from "express";
import { check } from "express-validator/check";

import processValidationResult = require("./processValidationResult");

export = [
  check("cpfCnpj")
    .exists().withMessage("O CPF/CNPJ deve ser informado"),

  check("dataNascimento")
    .isISO8601().withMessage("A data de nascimento é inválida"),

  check("nome", "Verifique o nome informado")
    .isLength({ min: 10 }).withMessage("O nome é muito pequeno")
    .exists().withMessage("O nome deve ser informado"),

  check("rgIe")
    .exists().withMessage("O RG deve ser informado"),

  check("tipoPessoa")
    .exists().withMessage("O tipo de pessoa deve ser informado")
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
    .isBoolean().withMessage("O valor é inválido"),

  check("ipAddress")
    .optional({ checkFalsy: true })
    .isIP(4).withMessage("Deve ser um IPv4 válido"),

  check("login")
    .exists().withMessage("O login deve ser informado")
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
    .exists().withMessage("Uma senha deve ser informada")
    .isLength({ min: 4 }).withMessage("A senha deve ter mais de 4 dígitos"),

  check("ponNo", "Verifique a PON informada")
    .optional({ checkFalsy: true })
    .isInt(),

  check("slotNo", "Verifique o SLOT informado")
    .optional({ checkFalsy: true })
    .isInt(),

  check("plano")
    .exists().withMessage("O plano do cliente deve ser informado")
    .isMongoId().withMessage("O plano é inválido"),

  check("autoBloquear")
    .exists().withMessage("O campo deve ser informado")
    .isBoolean().withMessage("Valor inválido"),

  check("contaBancaria")
    .exists().withMessage("A conta bancária deve ser informada")
    .isMongoId().withMessage("O valor é inválido"),

  check("diaVencimento")
    .exists().withMessage("O valor deve ser informado")
    .isInt().withMessage("O valor é inválido"),

  processValidationResult,
];
