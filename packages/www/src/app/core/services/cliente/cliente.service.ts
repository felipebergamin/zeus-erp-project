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
  BUSCAR_CLIENTES,
  BuscaClienteQuery,
  GetClienteByIdQuery,
  VALOR_TOTAL_MENSALIDADE_QUERY,
  ValorMensalidadeQuery,
  GET_CLIENTE_BY_ID,
  UPDATE_CLIENTE_MUTATION,
} from './cliente.graphql';
import { Cliente } from '../../models/Cliente';

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

  search(values: any): Observable<Cliente[]> {
    return this.apollo.query<BuscaClienteQuery>({
      query: BUSCAR_CLIENTES,
      variables: {
        search: values
      }
    }).pipe(
      map(res => res.data.searchCustomer)
    );
  }

  getById(id: number, fulldata = false): Observable<GetClienteByIdQuery> {
    return this.apollo.query<GetClienteByIdQuery>({
      query: fulldata ? GET_CLIENTE_BY_ID.FULLDATA : GET_CLIENTE_BY_ID.BASIC_DATA,
      variables: {
        id,
      },
    }).pipe(
      map(res => res.data)
    );
  }

  valorMensalidade(clienteID: number): Observable<number> {
    return this.apollo.query<ValorMensalidadeQuery>({
      query: VALOR_TOTAL_MENSALIDADE_QUERY,
      variables: {
        clienteID
      }
    }).pipe(
      map(res => +res.data.valorTotalMensalidadeCliente)
    );
  }

  update(id: number, input: Cliente) {
    return this.apollo.mutate({
      mutation: UPDATE_CLIENTE_MUTATION,
      variables: {
        id,
        input,
      }
    }).pipe(map(res => res.data.updateCustomer));
  }
}
