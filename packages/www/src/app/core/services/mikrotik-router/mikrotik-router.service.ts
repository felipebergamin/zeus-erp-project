import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LIST_MK_ROUTERS_QUERY, MikrotikRouterList } from './mikrotik-router.graphql';

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
}
