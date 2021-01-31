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
  mutation createMkRouter($input: MikrotikRouterInput!) {
    createMikrotikRouter(input: $input) {
      id
      createdAt
    }
  }
`;

export const UPDATE_MK_ROUTER_MUTATION = gql`
  mutation updateMikrotikRouter($id: Int!, $input: UpdateMikrotikRouterInput!) {
    updateMikrotikRouter(id: $id, input: $input) {
      id
      updatedAt
    }
  }
`;

export const DELETE_MK_ROUTER_MUTATION = gql`
  mutation deleteMkRouter($id: Int!) {
    deleteMikrotikRouter(id: $id)
  }
`;

export const MK_ROUTER_BY_ID_QUERY = gql`
  query mikrotikRouterById($id: Int!) {
    mikrotikRouterById(id: $id) {
      id
      ipAddress
      username
      apiPort
      systemName
      radiusSecret
      createdAt
      updatedAt
    }
  }
`;
