import gql from 'graphql-tag';

export interface ListaPontosAcesso {
  listarPontosDeAcesso: [{
    _id: number;
    login: string;
    cliente: {
      _id: number;
      nome: string;
    }
  }];
  totalPontosDeAcesso: number;
}

export const LISTAR_PONTOS_ACESSO = gql`
  query listarPAs($first: Int, $offset: Int, $nopaginate: Boolean) {
    listarPontosDeAcesso(first: $first, offset: $offset, nopaginate: $nopaginate) {
      _id
      login
      plano {
        nome
      }
      cliente {
        _id
        nome
      }
    }
    totalPontosDeAcesso
  }
`;
