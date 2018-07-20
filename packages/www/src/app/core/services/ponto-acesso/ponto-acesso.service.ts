import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import { LISTAR_PONTOS_ACESSO, ListaPontosAcesso } from './ponto-acesso.graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PontoAcessoService {

  constructor(
    private apollo: Apollo
  ) { }

  list(variables: { first?: number, offset?: number, nopaginate?: boolean } = {}): Observable<ListaPontosAcesso> {
    return this.apollo.query<ListaPontosAcesso>({
      query: LISTAR_PONTOS_ACESSO,
      variables
    }).pipe(
      map(res => res.data)
    );
  }
}
