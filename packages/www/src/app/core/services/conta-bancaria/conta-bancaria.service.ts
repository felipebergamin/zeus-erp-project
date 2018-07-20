import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { LISTAR_CONTAS_BANCARIAS, ListarContasBancarias } from './conta-bancaria.graphql';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService {

  constructor(
    private apollo: Apollo
  ) { }

  list(variables: { first?: number, offset?: number, excluded?: boolean, nopaginate?: boolean } =
    { first: 10, offset: 0, excluded: false, nopaginate: false }): Observable<ListarContasBancarias> {
    return this.apollo.query<ListarContasBancarias>({
      query: LISTAR_CONTAS_BANCARIAS,
      variables: {
        variables
      }
    }).pipe(
      map(res => res.data)
    );
  }
}
