import { IPerfilUsuario } from "./IPerfilUsuario";

export interface IUsuario {
  _id: string;
  ativo: boolean;
  email: string;
  login: string;
  nome: string;
  passwd: string;
  perfil: string|IPerfilUsuario;
  telegramID: string;
  tipo: string;

  alteradoEm: Date;
  criadoEm: Date;
  excluidoEm: Date;
}
