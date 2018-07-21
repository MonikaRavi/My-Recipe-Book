import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';


import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../ngRx-store/shopping-list.actions' ;
import * as ShoppingListReducers from '../ngRx-store/shopping-list.reducers';

import * as AppReducers from '../../AppStore/app.reducer'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;


  subscription: Subscription;

  editMode = false;

    editedItem : Ingredient;

  constructor(private store: Store<AppReducers.AppState>) { }

  ngOnInit() {

   this.subscription =  this.store.select('shoppingList')
    .subscribe(
      data => {
        if(data.editedIngredientIndex > -1 ) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        } else {
          this.editMode = false;
        }
      }
    ) ;


  }

  onSubmit(form: NgForm) {

    const value = form.value;

    const newIngredient = new Ingredient(value.name, value.amount);

    if(this.editMode){
         //   this.slService.updateIngredient(this.editedItemIndex, newIngredient );

            this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));

    }else {
 
    //this.slService.addIngredient(newIngredient);


    this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));

    }
  this.editMode = false;
    form.reset();

  }

  onClear(){

    this.slForm.reset();
    this.editMode = false;

  }

  onDelete(){
  

    this.store.dispatch(new ShoppingListActions.DeleteIngredient())

  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();

  }

 

}
