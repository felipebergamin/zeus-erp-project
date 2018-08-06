import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProblemaChamadoInput, ADD_PROBLEMA_CHAMADO_MUTATION, ListarProblemasChamadoQuery, LISTAR_PROBLEMAS_CHAMADO_QUERY } from './problema-chamado.graphql';
import { ProblemaChamado } from '../../models/ProblemaChamado';

@Injectable({
  providedIn: 'root'
})
export class ProblemaChamadoService {

  constructor(private apollo: Apollo) { }

  create(input: ProblemaChamadoInput): Observable<ProblemaChamado> {
    return this.apollo.mutate({
      mutation: ADD_PROBLEMA_CHAMADO_MUTATION,
      variables: { input },
    }).pipe(
      map(res => res.data.addProblemaChamado)
    );
  }

  listar(variables?: { first: number, offset: number }): Observable<ListarProblemasChamadoQuery> {
    return this.apollo.query<ListarProblemasChamadoQuery>({
      query: LISTAR_PROBLEMAS_CHAMADO_QUERY,
      variables,
    }).pipe(
      map(res => res.data)
    );
  }
}
