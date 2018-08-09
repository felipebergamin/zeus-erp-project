import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  LISTAR_PONTOS_ACESSO,
  LOGIN_EXISTS_QUERY,
  CREATE_PA_MUTATION,
  PONTO_ACESSO_POR_CLIENTE_QUERY,
  CreatePontoAcessoInput,
  ListaPontosAcesso,
  LoginExistsQuery,
  PontoAcessoPorClienteQuery,
  BUSCAR_PONTOS_ACESSO_QUERY,
  BuscarPontosAcessoQuery,
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

  pasDoCliente(idCliente: number): Observable<PontoAcesso[]> {
    return this.apollo.query<PontoAcessoPorClienteQuery>({
      query: PONTO_ACESSO_POR_CLIENTE_QUERY,
      variables: { idCliente },
    }).pipe(
      map(res => res.data.pontoDeAcessoPorCliente)
    );
  }

  buscar(searchValues: any): Observable<PontoAcesso[]> {
    return this.apollo.query<BuscarPontosAcessoQuery>({
      query: BUSCAR_PONTOS_ACESSO_QUERY,
      variables: { searchValues },
    }).pipe(
      map(res => res.data.buscarPontosAcesso)
    );
  }
}
