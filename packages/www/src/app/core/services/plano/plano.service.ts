import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LISTAR_PLANOS_QUERY, ListarPlanosQuery } from './plano.graphql';
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

  listar(variables: { first?: number, offset?: number, nopaginate?: boolean }): Observable<Plano[]> {
    return this.apollo.query<ListarPlanosQuery>({
      query: LISTAR_PLANOS_QUERY,
      variables
    }).pipe(
      map(res => res.data.listarPlanos)
    );
  }
}
