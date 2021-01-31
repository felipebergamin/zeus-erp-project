import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LISTAR_POOLS_QUERY, ListarPoolsQuery, IPPoolInput, CRIAR_IP_POOL_MUTATION } from './ip-pool.graphql';
import { IPPool } from '../../models/IPPool';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';

@Injectable({
  providedIn: 'root'
})
export class IpPoolService {

  constructor(
    private apollo: Apollo
  ) { }

  listar(variables: { first?: number, offset?: number, nopaginate?: boolean }) {
    return this.apollo.query<ListarPoolsQuery>({
      query: LISTAR_POOLS_QUERY,
      variables,
    }).pipe(
      map(res => res.data),
    );
  }

  create(input: IPPoolInput): Observable<IPPool> {
    return this.apollo.mutate({
      mutation: CRIAR_IP_POOL_MUTATION,
      variables: {
        input
      }
    }).pipe(
      map(res => res.data.createIPPool),
    );
  }
}
