import gql from 'graphql-tag';
import { PerfilUsuario } from '../../models/PerfilUsuario';

export interface ListarPerfisUsuarioQuery {
  listarPerfisUsuario: PerfilUsuario[];
  totalPerfisUsuario: number;
}

export const LISTAR_PERFIS_USUARIO_QUERY = gql`
  query listarPerfis($first: Int, $offset: Int) {
    listarPerfisUsuario(first: $first, offset: $offset) {
      _id
      nome
      createdAt
    }
    totalPerfisUsuario
  }
`;
