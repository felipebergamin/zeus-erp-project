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

  check("enderecoCobranca")
    .exists().withMessage("O endereço de cobrança deve ser informado"),

  check("pontosDeAcesso")
    .exists().withMessage("Nenhum ponto de ativação foi especificado"),

  check("pontosDeAcesso.*.autoAtrelarMac")
    .optional({ checkFalsy: true })
    .isBoolean().withMessage("O valor do campo é inválido"),

  check("pontosDeAcesso.*.ipAddress")
    .optional({ checkFalsy: true })
    .isIP(4).withMessage("O endereço IP é inválido"),

  check("pontosDeAcesso.*.login")
    .exists().withMessage("O login deve ser informado")
    .isEmail().withMessage("O login PPPoE parece inválido"),

  check("pontosDeAcesso.*.macAddress")
    .optional({ checkFalsy: true })
    .isMACAddress().withMessage("O endereço MAC parece inválido"),

  check("pontosDeAcesso.*.macOnu")
    .optional({ checkFalsy: true })
    .isAlphanumeric().withMessage("O MAC da ONU deve ser alfanumérico"),

  check("pontosDeAcesso.*.olt")
    .optional({ checkFalsy: true })
    .isMongoId().withMessage("O ID da OLT é inválido"),

  check("pontosDeAcesso.*.passwd")
    .exists().withMessage("A senha PPPoE deve ser informada"),

  check("pontosDeAcesso.*.ponNo")
    .optional({ checkFalsy: true })
    .isNumeric().withMessage("O número da PON é inválido"),

  check("pontosDeAcesso.*.slotNo")
    .optional({ checkFalsy: true }).withMessage("O número do Slot é inválido"),

  check("pontosDeAcesso.*.plano")
    .exists().withMessage("O plano deve ser informado")
    .isMongoId().withMessage("O ID do plano é inválido"),

  check("pontosDeAcesso.*.incluirNaCobranca")
    .optional({ checkFalsy: true })
    .isBoolean().withMessage("O valor é inválido"),

  check("pontosDeAcesso.*.endereco.bairro")
    .exists().withMessage("O bairro deve ser informado"),

  check("pontosDeAcesso.*.endereco.cep")
    .exists().withMessage("O CEP deve ser informado"),

  check("pontosDeAcesso.*.endereco.cidade")
    .exists().withMessage("A cidade deve ser informada"),

  check("pontosDeAcesso.*.endereco.estado")
    .exists().withMessage("O estado deve ser informado"),

  check("pontosDeAcesso.*.endereco.ibge")
    .optional({ checkFalsy: true })
    .isNumeric().withMessage("O código do IBGE é inválido"),

  check("pontosDeAcesso.*.endereco.latitude")
    .optional({ checkFalsy: true })
    .isFloat().withMessage("A latitude não é um número válido"),

  check("pontosDeAcesso.*.endereco.longitude")
    .optional({ checkFalsy: true })
    .isFloat().withMessage("A longitude não é um número válido"),

  check("pontosDeAcesso.*.endereco.logradouro")
    .exists().withMessage("O logradouro deve ser informado"),

  check("pontosDeAcesso.*.endereco.numero")
    .exists().withMessage("O número da casa deve ser informado")
    .isAlphanumeric(),

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
