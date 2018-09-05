import gql from 'graphql-tag';
import { MikrotikRouter } from '../../models/MikrotikRouter';

export interface MikrotikRouterList {
  mikrotikRoutersList: MikrotikRouter[];
  mikrotikRoutersCount: number;
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
