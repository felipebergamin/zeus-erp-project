import gql from 'graphql-tag';
import { Usuario } from '../../models/Usuario';

export interface ListarUsuariosQuery {
  listUsers: Usuario[];
  totalUsers: number;
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
