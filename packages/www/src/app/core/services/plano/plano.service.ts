import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Plano } from '../../models/Plano';
import {
  CREATE_PLANO_MUTATION,
  GET_PLANO_BY_ID,
  LISTAR_PLANOS_QUERY,
  UPDATE_PLANO_MUTATION,

  ListarPlanosQuery,
  PlanoInput,
  DELETE_PLANO_MUTATION,
} from './plano.graphql';

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

  getByID(id: number): Observable<Plano> {
    return this.apollo.query<any>({
      query: GET_PLANO_BY_ID,
      variables: { id },
    }).pipe(map(res => res.data.getPlanoByID));
  }

  update(id: number, input: PlanoInput): Observable<Plano> {
    return this.apollo.mutate({
      mutation: UPDATE_PLANO_MUTATION,
      variables: { id, input },
    }).pipe(map(res => res.data.updatePlano));
  }

  deletePlano(id: number): Observable<boolean> {
    return this.apollo.mutate({
      mutation: DELETE_PLANO_MUTATION,
      variables: { id },
    }).pipe(map(res => res.data.deletePlano));
  }
}
