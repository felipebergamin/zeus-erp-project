import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ADD_CLIENTE_MUTATION,
  CPF_CNPJ_ALREADY_EXISTS_QUERY,
  LISTAR_CLIENTES,
  CriarCliente,
  ClienteInput,
  CpfAlreadyExistsQuery,
  ListarClientes,
} from './cliente.graphql';

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

  create(variables: ClienteInput): Observable<CriarCliente> {
    return this.apollo.mutate({
      mutation: ADD_CLIENTE_MUTATION,
      variables: {
        input: variables
      }
    }).pipe(
      map(res => res.data.createCustomer)
    );
  }

  cpfCnpjAlreadyExists(cpfCnpj: string) {
    return this.apollo.query<CpfAlreadyExistsQuery>({
      query: CPF_CNPJ_ALREADY_EXISTS_QUERY,
      variables: {
        cpfCnpj
      }
    }).pipe(
      map(res => res.data.cpfCnpjAlreadyExists)
    );
  }
}
