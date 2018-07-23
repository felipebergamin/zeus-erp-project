import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { LISTAR_OLT_QUERY, ListarOLTQuery } from './olt.graphql';
import { Observable } from 'rxjs';

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
}
