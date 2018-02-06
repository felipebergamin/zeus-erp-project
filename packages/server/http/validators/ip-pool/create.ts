import { Request, Response } from "express";
import { check } from "express-validator/check";
import nodeip = require("ip");

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("cidr")
    .exists().withMessage("Os endereços devem ser especificados")
    .custom((cidrs: any) => {
      if (Array.isArray(cidrs)) {
        return cidrs.every((cidr: string): boolean => {
          // quebra o formato 192.168.0.1/24 em um array
          const ipAndMask = cidr.split("/");

          // se o ip tem um formato inválido
          if (!nodeip.isV4Format(ipAndMask[0])) {
            return false;
          }

          // se o tamanho da máscara não é um número ou é um número fora do intervalo 0-32
          const maskLength = +ipAndMask[1];
          if (isNaN(maskLength) || maskLength < 0 || maskLength > 32) {
            return false;
          }

          // se passou nos testes
          return true;
        });
      }

      return false;
    }).withMessage("Os CIDR's são inválidos"),

  check("nome")
    .exists().withMessage("O pool deve ter um nome")
    .isAlpha("pt-BR").withMessage("Nome deve conter apenas letras"),

  processValidationResult,
];
