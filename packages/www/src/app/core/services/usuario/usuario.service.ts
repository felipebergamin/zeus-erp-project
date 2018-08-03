import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LISTAR_USUARIOS_QUERY, ListarUsuariosQuery, CriarUsuarioInput, CRIAR_USUARIO_MUTATION } from './usuario.graphql';
import { Usuario } from '../../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apollo: Apollo) { }

  listar(variables: { first?: number, offset?: number } = {}): Observable<ListarUsuariosQuery> {
    return this.apollo.query<ListarUsuariosQuery>({
      query: LISTAR_USUARIOS_QUERY,
      variables,
    }).pipe(
      map(res => res.data)
    );
  }

  criarUsuario(input: CriarUsuarioInput): Observable<Usuario> {
    return this.apollo.mutate({
      mutation: CRIAR_USUARIO_MUTATION,
      variables: { input },
    }).pipe(
      map(res => res.data.createUser)
    );
  }
}
