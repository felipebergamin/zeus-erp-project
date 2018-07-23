import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { LISTAR_OLT_QUERY, ListarOLTQuery, CREATE_OLT_MUTATION, OLTInput } from './olt.graphql';
import { Observable } from 'rxjs';
import { OLT } from '../../models/OLT';

@Injectable({
  providedIn: 'root'
})
export class OltService {

  constructor(
    private apollo: Apollo
  ) { }

  listar(variables: { first?: number, offset?: number, nopaginate?: boolean } = { first: 5, offset: 0, nopaginate: false })
    : Observable<ListarOLTQuery> {

    return this.apollo.query<ListarOLTQuery>({
      query: LISTAR_OLT_QUERY,
      variables
    }).pipe(
      map(res => res.data)
    );
  }

  create(input: OLTInput): Observable<OLT> {
    return this.apollo.mutate({
      mutation: CREATE_OLT_MUTATION,
      variables: {
        input
      }
    }).pipe(
      map(res => res.data.createOLT)
    );
  }
}
