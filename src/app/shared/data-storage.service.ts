import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";


import { map } from 'rxjs/operators';
import { Ingredient } from "./ingredient.model";
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from "@angular/common/http";

import { Store } from '@ngrx/store';
import * as ShoppingListReducers from '../shopping-list/ngRx-store/shopping-list.reducers';
import * as ShoppingListActions from '../shopping-list/ngRx-store/shopping-list.actions' ;

import * as AppReducers from '../AppStore/app.reducer'



@Injectable()

export class DataStorageService {



    constructor(private http: HttpClient, private recipeService: RecipeService,  private authService: AuthService, private store: Store<AppReducers.AppState>) {

    }



    storeRecipes() {

       

        /* ********************  OPTION 1
       // const headers = new HttpHeaders().set('Authorization', token) // to pass the token as header ; not supported by firebase but might be useful for other backend

        return this.http.put('https://ng-recipes-books.firebaseio.com/recipes.json', 
        this.recipeService.getRecipes(),{
            observe: 'body',
            params: new HttpParams().set('auth',tk),
            //headers: headers
        });

        *************** */

        /******* OPTION 2 ********* */

        const req = new HttpRequest('PUT', 'https://ng-recipes-books.firebaseio.com/recipes.json', 
        this.recipeService.getRecipes(),{reportProgress: true   // report progress is useful when uploading or downloading
           
        })    

       return  this.http.request(req)   // executing the request


    }

    storeList() {

        let ingredients = [];

     const IngredientList = this.store.select('shoppingList')
     .subscribe(
         data => {

           // console.log( 'Saving Ingredient : ' ,data.ingredients);

            ingredients = data.ingredients;


         }
     )

     //console.log('before saving ',ingredients);
        
        return this.http.put('https://ng-recipes-books.firebaseio.com/shoppinglist.json' ,
            ingredients);

            
    }

    getRecipes() {



      

        this.http.get<Recipe[]>('https://ng-recipes-books.firebaseio.com/recipes.json' ,  // Option 1:  defining the type of data from get request

            {
                observe: 'body',
                responseType: 'json'
            }

        )
            .pipe(map(
                (recipesData) => {  // httpclient will give the data automatically hence below line is not required
                    //  const recipesData: Recipe[] = response.json();
                    for (let recipe of recipesData) {
                        if (!recipe['ingredients']) {  //make sure we have ingredient array if all the ingredients are removed from recipe
                           // console.log(recipe);
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

        /* 
        
        OPTION 2 => If the get response returns a text

         this.http.get('https://ng-recipes-books.firebaseio.com/recipes.json?auth=' +tk, {

                           observe: 'response',  // gives the entire response as json object
                         //  observe: 'body'  // gives the response as text and not JS object
                        
                           responseType: 'text'
                         //  responseType: 'blob'  // if getting a file
                         //  responseType: 'arraybuffer'  // if buffer data
                         //  responseType: 'json'  // most common
                    })

                   .pipe(map(

                    (textData)={

                        console.log (textData);
                    }

                   ))
        
        */


    }

    getShoppingList() {

 

        this.http.get<Ingredient[]>('https://ng-recipes-books.firebaseio.com/shoppinglist.json' )
            .pipe(map(
                (listData) => {
                    //const listData: Ingredient[] = response.json();

                    return listData;
                }
            ))
            .subscribe(
                (list: Ingredient[]) => {

                   this.store.dispatch(new ShoppingListActions.UpdateIngredients(list));
                }
            );

    }

}