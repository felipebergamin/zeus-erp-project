import gql from 'graphql-tag';
import { MikrotikRouter } from '../../models/MikrotikRouter';

export interface MikrotikRouterList {
  mikrotikRoutersList: MikrotikRouter[];
  mikrotikRoutersCount: number;
}

export interface MikrotikRouterInput {
  ipAddress: string;
  username: string;
  password: string;
  apiPort?: number;
  systemName: string;
  radiusSecret: string;
}

export const LIST_MK_ROUTERS_QUERY = gql`
  query listMkRouters($first: Int, $offset: Int) {
    mikrotikRoutersList(first: $first, offset: $offset) {
      id
      systemName
      ipAddress
      createdAt
    }
    mikrotikRoutersCount
  }
`;

export const CREATE_MK_ROUTER_MUTATION = gql`
  mutation createMkRouter($input: MikrotikRouterInput) {
    createMikrotikRouter(input: $input) {
      id
      createdAt
    }
  }
`;
