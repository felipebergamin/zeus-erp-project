import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { Chamado } from '../../models/Chamado';
import { environment } from '../../../../environments/environment';
import {
  BUSCAR_CHAMADOS_QUERY,
  BuscarChamadosQuery,
  AbrirChamadoInput,
  ABRIR_CHAMADO_MUTATION,
  ListarChamadosAbertos,
  LISTAR_CHAMADOS_ABERTOS,
  CancelarChamadoInput,
  CANCELAR_CHAMADO_MUTATION
} from './chamado.graphql';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private apollo: Apollo, private auth: AuthService) { }

  buscar(searchValues): Observable<Chamado[]> {
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

  chamadosAbertos(variables: { first: number, offset: number }): Observable<ListarChamadosAbertos> {
    return this.apollo.query<ListarChamadosAbertos>({
      query: LISTAR_CHAMADOS_ABERTOS,
      variables,
    }).pipe(map(res => res.data));
  }

  getPrintURL(chamado: Chamado): Observable<string> {
    const uri = `${environment.serverURI}/chamado/${chamado._id}`;
    return this.auth.signUri(uri);
  }

  cancelar(id: number, input: CancelarChamadoInput): Observable<Chamado> {
    return this.apollo.mutate({
      mutation: CANCELAR_CHAMADO_MUTATION,
      variables: { id, input },
    }).pipe(map(res => res.data.cancelarChamado));
  }
}
