import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LISTAR_PERFIS_USUARIO_QUERY, ListarPerfisUsuarioQuery } from './perfil-usuario.graphql';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {

  constructor(private apollo: Apollo) { }

  listar(variables: { first?: number, offset?: number } = {}): Observable<ListarPerfisUsuarioQuery> {
    return this.apollo.query<ListarPerfisUsuarioQuery>({
      query: LISTAR_PERFIS_USUARIO_QUERY,
      variables,
    }).pipe(
      map(res => res.data)
    );
  }
}
