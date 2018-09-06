import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../../models/Usuario';
import {
  LISTAR_USUARIOS_QUERY,
  ListarUsuariosQuery,
  UsuarioInput,
  CRIAR_USUARIO_MUTATION,
  BUSCAR_USUARIOS,
  BuscaUsuariosQuery,
  SearchUsuarioInput } from './usuario.graphql';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apollo: Apollo) { }

  listar(variables: { first?: number, offset?: number, nopaginate?: boolean } = {}): Observable<ListarUsuariosQuery> {
    return this.apollo.query<ListarUsuariosQuery>({
      query: LISTAR_USUARIOS_QUERY,
      variables,
    }).pipe(
      map(res => res.data)
    );
  }

  criarUsuario(input: UsuarioInput): Observable<Usuario> {
    return this.apollo.mutate({
      mutation: CRIAR_USUARIO_MUTATION,
      variables: { input },
    }).pipe(
      map(res => res.data.createUser)
    );
  }

  buscar(searchValues: SearchUsuarioInput): Observable<Usuario[]> {
    return this.apollo.query<BuscaUsuariosQuery>({
      query: BUSCAR_USUARIOS,
      variables: { searchValues },
    }).pipe(map(res => res.data.searchUsers));
  }
}
