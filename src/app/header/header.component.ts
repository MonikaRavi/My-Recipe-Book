import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {



  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  onSaveData(){

    this.dataStorageService.storeRecipes()
    .subscribe(
      (response: Response) => { //console.log(response) ;
      }
    );

    this.dataStorageService.storeList()
    .subscribe(
      (response: Response) => { //console.log(response)
         ; }
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
