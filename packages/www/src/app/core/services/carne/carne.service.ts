import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Carne } from '../../models/Carne';
import {
  ADD_CARNE_MUTATION,
  CARNES_POR_CLIENTE_QUERY,
  AddCarneInput,
  CarnesPorClienteQuery,
  ADD_BOLETO_AO_CARNE_MUTATION,
  REMOVE_BOLETO_CARNE,
} from './carne.graphql';

@Injectable({
  providedIn: 'root'
})
export class CarneService {

  constructor(private apollo: Apollo) { }

  addCarne(input: AddCarneInput): Observable<Carne> {
    return this.apollo.mutate({
      mutation: ADD_CARNE_MUTATION,
      variables: { input },
    }).pipe(
      map(res => res.data.addCarne)
    );
  }

  listarCarnesPorCliente(cliente: number, queryBoletos = false): Observable<Carne[]> {
    return this.apollo.query<CarnesPorClienteQuery>({
      query: CARNES_POR_CLIENTE_QUERY[queryBoletos ? 'COM_BOLETOS' : 'SEM_BOLETOS'],
      variables: { cliente },
    }).pipe(
      map(res => res.data.carnesPorCliente)
    );
  }

  atrelarBoletoCarne(boleto: number, carne: number): Observable<boolean> {
    return this.apollo.mutate({
      mutation: ADD_BOLETO_AO_CARNE_MUTATION,
      variables: { boleto, carne },
    }).pipe(map(res => res.data.addBoletoAoCarne));
  }

  removeBoletoDoCarne(boleto: number): Observable<boolean> {
    return this.apollo.mutate({
      mutation: REMOVE_BOLETO_CARNE,
      variables: { boleto },
    }).pipe(map(res => res.data.removeBoletoDoCarne));
  }
}
