import gql from 'graphql-tag';
import { PerfilUsuario } from '../../models/PerfilUsuario';

export interface ListarPerfisUsuarioQuery {
  listarPerfisUsuario: PerfilUsuario[];
  totalPerfisUsuario: number;
}

export const LISTAR_PERFIS_USUARIO_QUERY = gql`
  query listarPerfis($first: Int, $offset: Int, $nopaginate: Boolean) {
    listarPerfisUsuario(first: $first, offset: $offset, nopaginate: $nopaginate) {
      _id
      nome
      createdAt
    }
    totalPerfisUsuario
  }
`;
