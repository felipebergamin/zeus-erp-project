import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UPLOAD_RETORNO_MUTATION } from './retorno.graphql';
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
}
