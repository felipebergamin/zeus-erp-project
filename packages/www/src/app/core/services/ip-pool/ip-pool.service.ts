import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { LISTAR_POOLS_QUERY, ListarPoolsQuery } from './ip-pool.graphql';

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
      variables
    }).pipe(
      map(res => res.data.listarIPPools),
    );
  }
}
