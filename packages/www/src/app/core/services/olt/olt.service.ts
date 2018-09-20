import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { OLT } from '../../models/OLT';
import {
  CREATE_OLT_MUTATION,
  DELETE_OLT_BY_ID,
  GET_OLT_BY_ID,
  LISTAR_OLT_QUERY,
  UPDATE_OLT_MUTATION,

  OLTInput,
  ListarOLTQuery,
} from './olt.graphql';

@Injectable({
  providedIn: 'root'
})
export class OltService {

  constructor(
    private apollo: Apollo
  ) { }

  listar(variables: { first?: number, offset?: number, nopaginate?: boolean } = { first: 5, offset: 0, nopaginate: false })
    : Observable<ListarOLTQuery> {

    return this.apollo.query<ListarOLTQuery>({
      query: LISTAR_OLT_QUERY,
      variables
    }).pipe(
      map(res => res.data)
    );
  }

  create(input: OLTInput): Observable<OLT> {
    return this.apollo.mutate({
      mutation: CREATE_OLT_MUTATION,
      variables: {
        input
      }
    }).pipe(
      map(res => res.data.createOLT)
    );
  }

  getByID(id: number): Observable<OLT> {
    return this.apollo.query<any>({
      query: GET_OLT_BY_ID,
      variables: { id },
    }).pipe(map(res => res.data.getOLTByID));
  }

  updateOlt(oltid: number, input: OLTInput): Observable<OLT> {
    return this.apollo.mutate({
      mutation: UPDATE_OLT_MUTATION,
      variables: { oltid, input },
    }).pipe(map(res => res.data.updateOLT));
  }

  deleteOlt(oltid: number): Observable<boolean> {
    return this.apollo.mutate({
      mutation: DELETE_OLT_BY_ID,
      variables: { oltid },
    }).pipe(map(res => res.data.deleteOLT));
  }
}
