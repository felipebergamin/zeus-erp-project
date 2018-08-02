import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LISTAR_USUARIOS_QUERY, ListarUsuariosQuery } from './usuario.graphql';

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
}
