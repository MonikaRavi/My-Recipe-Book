import { Injectable } from "@angular/core";

import { Http, Response } from '@angular/http';



import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";


import { map } from 'rxjs/operators';
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "./ingredient.model";
import { AuthService } from "../auth/auth.service";


@Injectable()

export class DataStorageService {

    

    constructor(private http: Http, private recipeService: RecipeService, private shoppingList: ShoppingListService, private authService: AuthService) {

    }

    

    storeRecipes() {

        const tk = this.authService.getToken();

        return this.http.put('https://ng-recipes-books.firebaseio.com/recipes.json?auth=' +tk, this.recipeService.getRecipes());


    }

    storeList() {
        const tk = this.authService.getToken();
        return this.http.put('https://ng-recipes-books.firebaseio.com/shoppinglist.json?auth=' +tk, this.shoppingList.getIngredients());
    }

    getRecipes() {

        

        const tk = this.authService.getToken();
          

        this.http.get('https://ng-recipes-books.firebaseio.com/recipes.json?auth=' +tk)
            .pipe(map(
                (response: Response) => {
                    const recipesData: Recipe[] = response.json();
                    for (let recipe of recipesData) {
                        if (!recipe['ingredients']) {  //make sure we have ingredient array if all the ingredients are removed from recipe
                            console.log(recipe);
                            recipe['ingredients'] = [];
                        }
                    }

                    return recipesData;
                }
            ))
            .subscribe(
                (recipes: Recipe[]) => {

                    this.recipeService.setRecipes(recipes);
                }
            );

    }

    getShoppingList() {

        const tk = this.authService.getToken();

         this.http.get('https://ng-recipes-books.firebaseio.com/shoppinglist.json?auth=' +tk)
            .pipe(map(
                (response: Response) => {
                    const listData: Ingredient[] = response.json();

                    return listData;
                }
            ))
            .subscribe(
                (list: Ingredient[]) => {

                    this.shoppingList.setIngredients(list);
                }
            );

    }

}