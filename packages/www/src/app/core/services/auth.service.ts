import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Base64 } from 'js-base64';
import { MatSnackBar } from '@angular/material';

import { AUTH_USER_MUTATION, IS_AUTH_QUERY, SIGN_URI_MUTATION } from './auth.graphql';
import { Usuario } from '../models/Usuario';
import { StorageKeys } from '../../storage-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser: Usuario;
  keepSigned: boolean;
  private _isAuthenticated = new ReplaySubject<boolean>(1);

  constructor(
    private apollo: Apollo,
    private router: Router,
  ) {
    this.isAuthenticated.subscribe(is => console.log('Auth ', is));
    this.init();
  }

  init(): void {
    this.keepSigned = JSON.parse(window.localStorage.getItem(StorageKeys.KEEP_SIGNED));

    if (this.keepSigned) {
      const token = localStorage.getItem(StorageKeys.AUTH_TOKEN);
      if (token) {
        const exp = this.extractTokenPayload(token).exp;

        if (exp < Math.floor(Date.now() / 1000)) {
          return this._isAuthenticated.next(false);
        }

        return this._isAuthenticated.next(true);
      } else {
        this._isAuthenticated.next(false);
      }
    } else {
      this._isAuthenticated.next(false);
    }
  }

  private extractTokenPayload(token: string): any {
    if (!token) {
      return null;
    }
    return JSON.parse(Base64.decode(token.split('.')[1]));
  }

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  checkAuth(): Observable<boolean> {
    return this.apollo.query<{ isAuth: boolean }>({
      query: IS_AUTH_QUERY
    }).pipe(
      map(res => res.data.isAuth),
      catchError((err) => {
        this.setAuthState({ _id: null, token: null, isAuthenticated: false });
        return throwError(err);
      })
    );
  }

  signinUser(variables: { login: string, passwd: string }): Observable<{ _id: number, token: string }> {
    return this.apollo.mutate({
      mutation: AUTH_USER_MUTATION,
      variables
    }).pipe(
      map(res => res.data.createToken),
      tap(res => this.setAuthState({ _id: res && res._id, token: res && res.token, isAuthenticated: res !== null })),
      catchError((err) => {
        this.setAuthState({ _id: null, token: null, isAuthenticated: false });
        return throwError(err);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(StorageKeys.AUTH_TOKEN);
    localStorage.removeItem(StorageKeys.KEEP_SIGNED);
    this._isAuthenticated.next(false);
    this.apollo.getClient().resetStore();
    this.router.navigate(['/auth/login']);
  }

  private setAuthState(authData: { _id: number, token: string, isAuthenticated: boolean }): void {
    if (authData.isAuthenticated) {
      localStorage.setItem(StorageKeys.AUTH_TOKEN, authData.token);
      this.authUser = { _id: authData._id };
    }
    this._isAuthenticated.next(authData.isAuthenticated);
  }

  toggleKeepSigned(): boolean {
    this.keepSigned = !this.keepSigned;
    localStorage.setItem(StorageKeys.KEEP_SIGNED, this.keepSigned.toString());

    return this.keepSigned;
  }

  signUri(uri: string): Observable<string> {
    return this.apollo.mutate({
      mutation: SIGN_URI_MUTATION,
      variables: { uri },
    }).pipe(
      map(res => res.data.signUri)
    );
  }
}
