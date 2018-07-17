import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import { LISTAR_CLIENTES, ListarClientes } from './cliente.graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private apollo: Apollo
  ) { }

  simpleList({ first = 25, offset = 0, excluded = false }: { first: number, offset: number, excluded: boolean }):
    Observable<ListarClientes> {

    return this.apollo.query<ListarClientes>({
      query: LISTAR_CLIENTES,
      variables: {
        first,
        offset,
        excluded
      }
    }).pipe(
      map(res => res.data)
    );
  }
}
