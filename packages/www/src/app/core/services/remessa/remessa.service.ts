import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GerarRemessaInput, GERAR_REMESSA_MUTATION, ListarArquivosRemessaQuery, LISTAR_REMESSAS_QUERY } from './remessa.graphql';
import { ArquivoRemessa } from '../../models/ArquivoRemessa';

@Injectable({
  providedIn: 'root'
})
export class RemessaService {

  constructor(private apollo: Apollo) { }

  gerarRemessa(input: GerarRemessaInput): Observable<ArquivoRemessa> {
    return this.apollo.mutate({
      mutation: GERAR_REMESSA_MUTATION,
      variables: { input },
    }).pipe(
      map(res => res.data.gerarArquivoRemessa)
    );
  }

  listarRemessa(variables?: { first: number, offset: number }): Observable<ListarArquivosRemessaQuery> {
    return this.apollo.query<ListarArquivosRemessaQuery>({
      query: LISTAR_REMESSAS_QUERY,
      variables,
    }).pipe(
      map(res => res.data)
    );
  }
}
