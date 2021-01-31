import { CanActivate, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthModule } from './auth.module';
import { AuthService } from '../core/services/auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: AuthModule
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated
      .pipe(
        tap(is => {
          if (!is) {
            this.router.navigate(['/auth/login']);
          }
        })
      );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.authService.isAuthenticated
      .pipe(take(1));
  }
}
