import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BUSCAR_CHAMADOS_QUERY, BuscarChamadosQuery, AbrirChamadoInput, ABRIR_CHAMADO_MUTATION } from './chamado.graphql';
import { Chamado } from '../../models/Chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private apollo: Apollo) { }

  buscar(searchValues): Observable<Chamado[]> {
    console.log(searchValues);
    return this.apollo.query<BuscarChamadosQuery>({
      query: BUSCAR_CHAMADOS_QUERY,
      variables: { searchValues },
    }).pipe(
      map(res => res.data.buscarChamados)
    );
  }

  abrirChamado(input: AbrirChamadoInput): Observable<Chamado> {
    return this.apollo.mutate({
      mutation: ABRIR_CHAMADO_MUTATION,
      variables: { input },
    }).pipe(
      map(res => res.data.abrirChamado)
    );
  }
}
