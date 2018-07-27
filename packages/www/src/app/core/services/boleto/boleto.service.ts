import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Boleto } from '../../models/Boleto';
import { PESQUISA_BOLETOS_QUERY, PesquisaBoletosQuery, BoletoInput, CRIAR_BOLETO_MUTATION } from './boleto.graphql';
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
}
