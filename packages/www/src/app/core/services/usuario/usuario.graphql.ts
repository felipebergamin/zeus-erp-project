import gql from 'graphql-tag';
import { Usuario } from '../../models/Usuario';

export interface ListarUsuariosQuery {
  listUsers: Usuario[];
  totalUsers: number;
}

export interface UsuarioInput {
  email: string;
  login: string;
  nome: string;
  passwd: string;
  perfil: number;
  telegramID?: string;
  tipo: string;
}

export interface SearchUsuarioInput {
  email?: string;
  login?: string;
  nome?: string;
  passwd?: string;
  perfil?: number;
  telegramID?: string;
  tipo?: string;
}

export interface BuscaUsuariosQuery {
  searchUsers: Usuario[];
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

export const BUSCAR_USUARIOS = gql`
  query searchUsers($searchValues: SearchUsuarioInput!) {
    searchUsers(searchValues: $searchValues) {
      _id
      nome
      tipo
      createdAt
    }
  }
`;
