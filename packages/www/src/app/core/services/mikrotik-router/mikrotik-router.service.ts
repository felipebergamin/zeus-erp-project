import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CREATE_MK_ROUTER_MUTATION,
  DELETE_MK_ROUTER_MUTATION,
  LIST_MK_ROUTERS_QUERY,
  UPDATE_MK_ROUTER_MUTATION,

  MikrotikRouterInput,
  MikrotikRouterList,
  MK_ROUTER_BY_ID_QUERY,
} from './mikrotik-router.graphql';
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

  updateRouter(id: number, input: MikrotikRouterInput): Observable<MikrotikRouter> {
    return this.apollo.mutate({
      mutation: UPDATE_MK_ROUTER_MUTATION,
      variables: { id, input },
    }).pipe(map(res => res.data.updateMikrotikRouter));
  }

  deleteRouter(id: number): Observable<MikrotikRouter> {
    return this.apollo.mutate({
      mutation: DELETE_MK_ROUTER_MUTATION,
      variables: id,
    }).pipe(map(res => res.data.deleteMikrotikRouter));
  }

  getByID(id: number): Observable<MikrotikRouter> {
    return this.apollo.query<any>({
      query: MK_ROUTER_BY_ID_QUERY,
      variables: { id },
    }).pipe(map(res => res.data.mikrotikRouterById));
  }
}
