import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { catchError, iif, mergeMap, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private cookies: CookieService,
    private router: Router,
    private api: ApiService
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const redirect = of(this.router.parseUrl('/login'));

    const token = this.cookies.get('access_token');

    if (!token) return redirect;

    return this.api.signin(token).pipe(
      catchError((httpError: HttpErrorResponse) => {
        return of(null);
      }),
      mergeMap((res) => {
        if (!res) return redirect;

        this.cookies.set('access_token', res.token);

        return of(true);
      })
    );
    throw new Error('Method not implemented.');
  }
}
