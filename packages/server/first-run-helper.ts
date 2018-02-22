import randomstring = require("randomstring");
import readline = require("readline");

import { instanceDB } from "./db/initConnection";
import debug = require("./debug");

const isFirstRun = async () => {
  const Usuario = (await instanceDB()).model("Usuario");
  const usuarios = await Usuario.find({}).select("_id").exec();
  return usuarios.length === 0;
};

export async function setupApplication() {
  const Usuario = (await instanceDB()).model("Usuario");
  const PerfilUsuario = (await instanceDB()).model("PerfilUsuario");
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
