import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UPLOAD_RETORNO_MUTATION, ListarRetornosQuery, LISTAR_RETORNOS_QUERY } from './retorno.graphql';
import { ArquivoRetorno } from '../../models/ArquivoRetorno';

@Injectable({
  providedIn: 'root'
})
export class RetornoService {

  constructor(private apollo: Apollo) { }

  uploadRetorno(vars, file: File): Observable<ArquivoRetorno> {
    return this.apollo.mutate({
      mutation: UPLOAD_RETORNO_MUTATION,
      variables: { input: {
        ...vars,
        file,
      } },
    }).pipe(map(res => res.data.uploadRetorno));
  }

  listarRetornos(variables?: {first: number, offset: number}): Observable<ListarRetornosQuery> {
    return this.apollo.query<ListarRetornosQuery>({
      query: LISTAR_RETORNOS_QUERY,
      variables
    }).pipe(map(res => res.data));
  }
}
