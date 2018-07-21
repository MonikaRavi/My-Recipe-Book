import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../../shopping-list/ngRx-store/shopping-list.actions'

import * as ShoppingListReducers from '../../shopping-list/ngRx-store/shopping-list.reducers';

import * as AppReducers from '../../AppStore/app.reducer'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {


 recipeDetail: Recipe ;
 id: number;

  constructor(private recipeService : RecipeService, private route: ActivatedRoute, private router: Router,
      private store: Store<AppReducers.AppState>) { }

  ngOnInit() {

    this.route.params.subscribe(

      (para: Params) => {

        this.id = +para['id'];
        this.recipeDetail = this.recipeService.getRecipe(this.id);
      }
      
    );

  }

  onAddItemToShopping(){

//this.recipeService.addIngredientstoShoppingList(this.recipeDetail.ingredients);

    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeDetail.ingredients));

  }


  onEditRecipe(){

    this.router.navigate(['edit'], {relativeTo: this.route}); // we don't need id here because the id will already be in the URL - using relative path

    // Alternate way

  //  this.router.navigate(['../', this.id,'edit'], {relativeTo: this.route}); 

    // cobnstruncting complex path -> moving one step upwards, adding ID , edit to the URL

  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
