import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LIST_MK_ROUTERS_QUERY, MikrotikRouterList, MikrotikRouterInput, CREATE_MK_ROUTER_MUTATION } from './mikrotik-router.graphql';
import { MikrotikRouter } from '../../models/MikrotikRouter';

@Injectable({
  providedIn: 'root'
})
export class MikrotikRouterService {

  constructor(private apollo: Apollo) { }

  mikrotikRoutersList(variables?: { first?: number, offset?: number, nopaginate?: boolean }): Observable<MikrotikRouterList> {
    return this.apollo.query<MikrotikRouterList>({
      query: LIST_MK_ROUTERS_QUERY,
      variables,
    }).pipe(map(res => res.data));
  }

  createRouter(input: MikrotikRouterInput): Observable<MikrotikRouter> {
    return this.apollo.mutate({
      mutation: CREATE_MK_ROUTER_MUTATION,
      variables: { input },
    }).pipe(map(res => res.data.createMikrotikRouter));
  }
}
