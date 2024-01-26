import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private spinnerSvc: NgxSpinnerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerSvc.show();
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.message)
          Swal.fire('Error', error.error.message, 'error');

        return throwError(error);
      }),
      finalize(() => {
        this.spinnerSvc.hide();
      })
    );
  }
}
