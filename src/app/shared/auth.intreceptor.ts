import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";

import * as appReducer from '../AppStore/app.reducer';

import * as authReducer from '../auth/Auth-Store/auth.reducers';
import { switchMap, take } from "rxjs/operators";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<appReducer.AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //request is immutable i.e., cannot be edited

        // console.log('Intercepted', req);

        // console.log(copiedReq);

        return this.store.select('auth')
          .pipe( take(1),
            switchMap(
                (authState: authReducer.State) => {

                    const copiedReq = req.clone({ params: req.params.set('auth', authState.token) }); //copy of incoming request        
                     
                    return next.handle(copiedReq);
                }
            )
        );

    }
}