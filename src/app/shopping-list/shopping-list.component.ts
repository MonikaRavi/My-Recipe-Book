import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model' ;
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as ShoppingListActions from './ngRx-store/shopping-list.actions' ;

import * as AppReducers from '../AppStore/app.reducer'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit { 

   shoppingListState : Observable<{ingredients: Ingredient[]}>

  private subscription: Subscription

  constructor( private store: Store<AppReducers.AppState>) { }

  ngOnInit() {


    this.shoppingListState = this.store.select('shoppingList')

   }

  
  onEditItem(index: number){

    this.store.dispatch(new ShoppingListActions.StartEdit(index));

  }
  
}
