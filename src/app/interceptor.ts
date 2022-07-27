import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  router: Router = null;

  constructor(rtr: Router) {
    this.router = rtr;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem("accessToken");

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    if (!request.headers.has('Accept')) {
      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    }

    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: Error) => {
        if (error instanceof HttpErrorResponse) {
          if ((<HttpErrorResponse>error).status === 200) {
            // do nothing
          } else if (error.status === 401) {
            // do nothing
          } else if (error && error.status === 403) {
            // do nothing
          } else if (error && error.error === "invalid_grant") {
            // do nothing
          } else if (error.status === 400 || error.status === 404 || error.status === 500 && error.error && error.error.toString().includes('\"message\"')) {
            // do nothing
          } else {
            //this.serverErrorService.error = error;
            this.router.navigate(['error'], { skipLocationChange: true });
            return throwError(error);
          }
        } else {
          return this.handle400Error(null);
        }
        return throwError(error);
      }));
  }

  handle400Error(error: HttpErrorResponse) {
    return of(new HttpResponse());
  }
}
