import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PerfilUsuario } from '../../models/PerfilUsuario';
import {
  CRIAR_PERFIL_USUARIO_MUTATION,
  LISTAR_PERFIS_USUARIO_QUERY,
  ListarPerfisUsuarioQuery,
  PerfilUsuarioInput,
} from './perfil-usuario.graphql';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {

  constructor(private apollo: Apollo) { }

  listar(variables: { first?: number, offset?: number, nopaginate?: boolean } = {}): Observable<ListarPerfisUsuarioQuery> {
    return this.apollo.query<ListarPerfisUsuarioQuery>({
      query: LISTAR_PERFIS_USUARIO_QUERY,
      variables,
    }).pipe(
      map(res => res.data)
    );
  }

  criar(input: PerfilUsuarioInput): Observable<PerfilUsuario> {
    return this.apollo.mutate({
      mutation: CRIAR_PERFIL_USUARIO_MUTATION,
      variables: { input },
    }).pipe(
      map(res => res.data.createUserProfile)
    );
  }
}
