import { PerfilUsuario } from './PerfilUsuario';

export class Usuario {
  _id?: number;
  email?: string;
  login?: string;
  nome?: string;
  passwd?: string;
  perfil?: PerfilUsuario;
  telegramID?: string;
  tipo?: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
