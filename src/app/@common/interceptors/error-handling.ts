import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req.clone();
    return next.handle(newReq).pipe(
      tap({
        error: (res) => {
          console.log(res);

          if (
            res instanceof HttpErrorResponse &&
            res.status.toString().includes('50')
          ) {
            this.router.navigateByUrl('/server-error');
          }
        },
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
