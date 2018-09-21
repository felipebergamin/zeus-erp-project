import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import {
  CRIAR_CONTA_BANCARIA_MUTATION,
  LISTAR_CONTAS_BANCARIAS,
  ContaBancariaInput,
  ListarContasBancarias,
  UPDATE_CONTA_BANCARIA_MUTATION,
  GET_CONTA_BANCARIA_BY_ID,
  EXCLUIR_CONTA_BANCARIA_MUTATION,
} from './conta-bancaria.graphql';
import { Observable } from 'rxjs';
import { ContaBancaria } from '../../models/ContaBancaria';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService {

  constructor(
    private apollo: Apollo
  ) { }

  list(variables: { first?: number, offset?: number, excluded?: boolean, nopaginate?: boolean } =
    { first: 10, offset: 0, excluded: false, nopaginate: false }): Observable<ListarContasBancarias> {
    return this.apollo.query<ListarContasBancarias>({
      query: LISTAR_CONTAS_BANCARIAS,
      variables: {
        variables
      }
    }).pipe(
      map(res => res.data)
    );
  }

  create(input: ContaBancariaInput): Observable<ContaBancaria> {
    return this.apollo.mutate({
      mutation: CRIAR_CONTA_BANCARIA_MUTATION,
      variables: { input },
    }).pipe(
      map(res => res.data.createBankAccount)
    );
  }

  getByID(id: number): Observable<ContaBancaria> {
    return this.apollo.query<any>({
      query: GET_CONTA_BANCARIA_BY_ID,
      variables: { id },
    }).pipe(map(res => res.data.getBankAccountByID));
  }

  update(id: number, input: any): Observable<ContaBancaria> {
    return this.apollo.mutate({
      mutation: UPDATE_CONTA_BANCARIA_MUTATION,
      variables: { id, input },
    }).pipe(map(res => res.data.getBankAccountByID));
  }

  delete(id: number): Observable<boolean> {
    return this.apollo.mutate({
      mutation: EXCLUIR_CONTA_BANCARIA_MUTATION,
      variables: { id },
    }).pipe(map(res => res.data.deleteBankAccount));
  }
}
