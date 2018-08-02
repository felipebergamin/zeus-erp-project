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

  listarCarnesPorCliente(cliente: number): Observable<Carne[]> {
    return this.apollo.query<CarnesPorClienteQuery>({
      query: CARNES_POR_CLIENTE_QUERY,
      variables: { cliente },
    }).pipe(
      map(res => res.data.carnesPorCliente)
    );
  }
}
