import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';

import { Store } from '@ngrx/store';

import * as appReducers from '../AppStore/app.reducer';

import * as authReducer from './Auth-Store/auth.reducers';

import { map, take } from 'rxjs/operators';


@Injectable()

export class AuthGuardService implements CanActivate {

  
  constructor(private store: Store<appReducers.AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      return this.store.select('auth').pipe(take(1),
        map((authState: authReducer.State)=>{
return authState.authenticated; 
      })
    );
   
  }

}
