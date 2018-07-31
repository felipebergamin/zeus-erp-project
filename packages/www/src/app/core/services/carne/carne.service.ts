import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Carne } from '../../models/Carne';
import {
  CARNES_POR_CLIENTE_QUERY,
  CarnesPorClienteQuery,
} from './carne.graphql';

@Injectable({
  providedIn: 'root'
})
export class CarneService {

  constructor(private apollo: Apollo) { }

  listarCarnesPorCliente(cliente: number): Observable<Carne[]> {
    return this.apollo.query<CarnesPorClienteQuery>({
      query: CARNES_POR_CLIENTE_QUERY,
      variables: { cliente },
    }).pipe(
      map(res => res.data.carnesPorCliente)
    );
  }
}
