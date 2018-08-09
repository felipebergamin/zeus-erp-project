import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BUSCAR_CHAMADOS_QUERY, BuscarChamadosQuery } from './chamado.graphql';
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
}
