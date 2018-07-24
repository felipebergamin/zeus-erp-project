import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LISTAR_PLANOS_QUERY, ListarPlanosQuery, PlanoInput, CREATE_PLANO_MUTATION } from './plano.graphql';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Plano } from '../../models/Plano';

@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  constructor(
    private apollo: Apollo
  ) { }

  listar(variables?: { first?: number, offset?: number, nopaginate?: boolean }): Observable<ListarPlanosQuery> {
    return this.apollo.query<ListarPlanosQuery>({
      query: LISTAR_PLANOS_QUERY,
      variables
    }).pipe(
      map(res => res.data)
    );
  }

  create(input: PlanoInput): Observable<Plano> {
    return this.apollo.mutate({
      mutation: CREATE_PLANO_MUTATION,
      variables: {
        input
      }
    }).pipe(
      map(res => res.data.createPlano)
    );
  }
}
