import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  LISTAR_PONTOS_ACESSO,
  LOGIN_EXISTS_QUERY,
  CREATE_PA_MUTATION,
  CreatePontoAcessoInput,
  ListaPontosAcesso,
  LoginExistsQuery,
} from './ponto-acesso.graphql';
import { PontoAcesso } from '../../models/PontoAcesso';

@Injectable({
  providedIn: 'root'
})
export class PontoAcessoService {

  constructor(
    private apollo: Apollo
  ) { }

  create(input: CreatePontoAcessoInput): Observable<PontoAcesso> {
    return this.apollo.mutate({
      mutation: CREATE_PA_MUTATION,
      variables: {
        input
      }
    }).pipe(
      map(res => res.data.addPontoDeAcesso)
    );
  }

  list(variables: { first?: number, offset?: number, nopaginate?: boolean } = {}): Observable<ListaPontosAcesso> {
    return this.apollo.query<ListaPontosAcesso>({
      query: LISTAR_PONTOS_ACESSO,
      variables
    }).pipe(
      map(res => res.data)
    );
  }

  loginAlreadyExists(login: string): Observable<boolean> {
    return this.apollo.query<LoginExistsQuery>({
      query: LOGIN_EXISTS_QUERY,
      variables: {
        login
      }
    }).pipe(
      map(res => res.data.loginAlreadyExists)
    );
  }
}
