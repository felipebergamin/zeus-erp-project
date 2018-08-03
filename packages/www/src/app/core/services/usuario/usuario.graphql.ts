import gql from 'graphql-tag';
import { Usuario } from '../../models/Usuario';

export interface ListarUsuariosQuery {
  listUsers: Usuario[];
  totalUsers: number;
}

export interface CriarUsuarioInput {
  email: string;
  login: string;
  nome: string;
  passwd: string;
  perfil: number;
  telegramID?: string;
  tipo: string;
}

export const LISTAR_USUARIOS_QUERY = gql`
  query listarUsuarios($first:Int, $offset:Int) {
    listUsers(first:$first, offset:$offset) {
      _id
      nome
      login
      createdAt
      perfil {
        _id
        nome
      }
    }
    totalUsers
  }
`;

export const CRIAR_USUARIO_MUTATION = gql`
  mutation addusuario($input: UsuarioInput!) {
    createUser(input: $input) {
      _id
      createdAt
    }
  }
`;
