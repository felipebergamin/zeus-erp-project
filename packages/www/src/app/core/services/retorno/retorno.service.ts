import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { UPLOAD_RETORNO_MUTATION } from './retorno.graphql';

@Injectable({
  providedIn: 'root'
})
export class RetornoService {

  constructor(private apollo: Apollo) { }

  uploadRetorno(file: File) {
    return this.apollo.mutate({
      mutation: UPLOAD_RETORNO_MUTATION,
      variables: { file },
    }).pipe(map(res => res.data));
  }
}
