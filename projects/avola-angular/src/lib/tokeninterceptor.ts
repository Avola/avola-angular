import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';

import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('connect/token') === -1) {
      return from(this.auth.getToken())
      .pipe(switchMap(token => {
           const headers = request.headers
                    .set('Authorization', 'Bearer ' + token.access_token)
                    .append('Content-Type', 'application/json');
           const reqClone = request.clone({
             headers
            });

          return next.handle(reqClone);
     }));
    }

    return next.handle(request);
  }
}
