import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";


export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(   //handle request after sent or handle response
            event => {
               // console.log('Logging Interceptor: ', event);
            }
        ))
    }
}