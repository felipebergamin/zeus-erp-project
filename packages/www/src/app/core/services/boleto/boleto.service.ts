import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Boleto } from '../../models/Boleto';
import {
  PESQUISA_BOLETOS_QUERY,
  CRIAR_BOLETO_MUTATION,
  LISTAR_BOLETOS_QUERY,
  BoletoInput,
  ListarBoletosQuery,
  PesquisaBoletosQuery,
} from './boleto.graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {

  constructor(private apollo: Apollo) { }

  pesquisar(search): Observable<Boleto[]> {
    return this.apollo.query<PesquisaBoletosQuery>({
      query: PESQUISA_BOLETOS_QUERY,
      variables: {
        search
      }
    }).pipe(
      map(res => res.data.pesquisarBoletos)
    );
  }

  criar(input: BoletoInput): Observable<Boleto> {
    return this.apollo.mutate({
      mutation: CRIAR_BOLETO_MUTATION,
      variables: {input},
    }).pipe(
      map(res => res.data.addBoleto)
    );
  }

  listarBoletos({first = 50, offset = 0}): Observable<ListarBoletosQuery> {
    return this.apollo.query<ListarBoletosQuery>({
      query: LISTAR_BOLETOS_QUERY,
      variables: {
        first,
        offset,
      }
    }).pipe(
      map(res => res.data)
    );
  }
}
