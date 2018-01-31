import randomstring = require("randomstring");
import readline = require("readline");

import PerfilUsuario = require("./db/model/PerfilUsuario");
import Usuario = require("./db/model/Usuario");
import debug = require("./debug");

const isFirstRun = async () => {
  const usuarios = await Usuario.find({}).select("_id").exec();
  return usuarios.length === 0;
};

export async function setupApplication() {
  const firstRun = await isFirstRun();

  if (firstRun) {
    debug("Sistema se preparando para a primeira inicialização");
    const nome = "admin";
    const login = "admin";
    const passwd = "admin";
    const email = `admin@email.com`;
    const tipo = "outro";

    const perfil = new PerfilUsuario({
      criarUsuarios: true,
      nome: "Criar Usuarios",
    });
    await perfil.save();

    const usuario = new Usuario({
      email,
      login,
      nome,
      passwd,
      perfil: perfil.id,
      tipo,
    });
    await usuario.save();
  }
}
