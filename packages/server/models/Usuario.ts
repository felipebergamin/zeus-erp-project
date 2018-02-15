import { PerfilUsuario } from "./PerfilUsuario";

export class Usuario {
  public ativo: boolean;
  public email: string;
  public login: string;
  public nome: string;
  public passwd: string;
  public perfil: string|PerfilUsuario;
  public telegramID: string;
  public tipo: string;

  public alteradoEm: Date;
  public criadoEm: Date;
  public excluidoEm: Date;
}
