import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent} from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as appReducers from '../../AppStore/app.reducer'  
import * as authReducers from '../../auth/Auth-Store/auth.reducers'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  authState: Observable<authReducers.State> ;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService,
        private store: Store<appReducers.AppState>) { }

        ngOnInit(){

         this.authState = this.store.select('auth')

        }

  onSaveData(){

    this.dataStorageService.storeRecipes()
    .subscribe(
      (response) => { 
        console.log(response) ;
      }
    );

    this.dataStorageService.storeList() 
   
    .subscribe(
      (response) => { 
        //console.log(response);
          }
    );

  }
  
  onFetchData(){

    this.dataStorageService.getRecipes();  // no need to subscribe as it is handled in service
    this.dataStorageService.getShoppingList();
  }



  onLogOut(){
    this.authService.logOut();
  }

  onDeleteUser(){

    this.authService.deleteUser();
    this.onLogOut();
  }

}
