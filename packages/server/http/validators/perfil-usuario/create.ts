import { Request, Response } from "express";
import { check } from "express-validator/check";
import nodeip = require("ip");

import { validateCPF } from "../fields/validateCPF";
import processValidationResult = require("../processValidationResult");

export = [
  check("nome")
    .exists().withMessage("Um nome para o perfil deve ser informado"),

  check("alterarClientes", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("bloquearClientes", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("criarClientes", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("desativarClientes", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("desbloquearClientes", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("visualizarClientes", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("alterarBoletos", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("criarBoletos", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("gerarRemessa", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("importarRetorno", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("receberBoletos", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("removerBoletos", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("visualizarBoletos", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("alterarUsuarios", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("criarUsuarios", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("removerUsuarios", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("visualizarUsuarios", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("abrirChamadoTecnico", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("alterarChamadoTecnico", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("cancelarChamadoTecnico", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("fecharChamadoTecnico", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("visualizarChamados", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("abrirInstalacao", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("alterarInstalacao", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("cancelarInstalacao", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("visualizarInstalacao", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("acessaAppTecnico", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("acessoTelegram", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("acessoWeb", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  check("visualizarLogs", "O valor deve ser apenas verdadeiro ou falso")
    .optional({ checkFalsy: true })
    .isBoolean(),

  processValidationResult,
];
