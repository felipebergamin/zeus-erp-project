import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AbrirInstalacaoInput, CREATE_INSTALACAO_MUTATION, LISTAR_INSTALACOES_QUERY, ListarInstalacoesQuery } from './instalacao.graphql';
import { Instalacao } from '../../models/Instalacao';

@Injectable({
  providedIn: 'root'
})
export class InstalacaoService {

  constructor(private apollo: Apollo) { }

  abrirInstalacao(input: AbrirInstalacaoInput): Observable<Instalacao> {
    return this.apollo.mutate({
      mutation: CREATE_INSTALACAO_MUTATION,
      variables: { input },
    }).pipe(map(res => res.data.abrirInstalacao));
  }

  listarInstalacoes(variables: {first?: number, offset?: number} = {}): Observable<ListarInstalacoesQuery> {
    return this.apollo.query<ListarInstalacoesQuery>({
      query: LISTAR_INSTALACOES_QUERY,
      variables,
    }).pipe(
      map(res => res.data)
    );
  }
}
