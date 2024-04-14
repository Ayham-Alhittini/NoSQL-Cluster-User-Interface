import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router : Router, private toastr : ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse) => {
        if (error) {
          switch(error.status)
          {
            case 400 :
              this.toastr.error("Bad Request", "See logs for more detials");
              console.log(error);
              break;
              case 401 :
                this.toastr.error("Unauthorised", error.status.toString());
                break;
              case 404 :
                this.toastr.error(error.error, error.status.toString());
                this.router.navigateByUrl('/not-found');
                break;
              case 500 :
                const navigationExtras : NavigationExtras = {state : {error : error.error}};
                this.router.navigateByUrl("/server-error", navigationExtras);
                break;
              default :
                this.toastr.error("Something Unexpected went wrong");
                console.log(error);
                break;
          }
        }
        throw error;
      })
    );
  }
}
