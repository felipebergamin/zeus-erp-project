import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SINAL_ONU_QUERY, SinalONUQuery, SinalOnu } from './fiberhome.graphql';

@Injectable({
  providedIn: 'root'
})
export class FiberhomeService {

  constructor(private apollo: Apollo) { }

  consultarSinalPA(pontoAcesso: number): Observable<SinalOnu> {
    return this.apollo.query<SinalONUQuery>({
      query: SINAL_ONU_QUERY,
      variables: { pontoAcesso },
    }).pipe(
      map(res => res.data.consultarSinalONUPA),
    );
  }
}
