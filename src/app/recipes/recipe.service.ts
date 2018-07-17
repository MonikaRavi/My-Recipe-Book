import { Recipe } from "./recipe.model";
import {  Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>(); // to track changes in the Recipe array - addition or update

    constructor(private shoppingService: ShoppingListService) {


    }

  

    private recipes: Recipe[] = [

        new Recipe('Idli',
            'Healthy Breakfast of rice and lentils',
            'https://i.ndtvimg.com/i/2017-11/oats-idli_620x330_71510224674.jpg',
            [
                new Ingredient('Parboiled Rice',4),
                new Ingredient('Black Gram',1)
            ]),

        new Recipe('Dosa',
            'Breakfast of rice and less lentils',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Dosa_and_ghee.jpg/1200px-Dosa_and_ghee.jpg',
            [
                new Ingredient('Raw Rice',1.5),
                new Ingredient('Parboiled Rice',1.5),
                new Ingredient('Black Gram',1) 

            ])

    ];

    setRecipes(recipes: Recipe[]) {

        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());

    }


    getRecipes() {

        return this.recipes.slice();  //get a copy of array and not the array itself; 
        //array is a memory reference object ; will not be updated if there is a change in array
        // Hence Subject is used

    }

    addIngredientstoShoppingList(ingredients: Ingredient[]){

        this.shoppingService.addIngredients(ingredients);


    }

    getRecipe(index: number) {

        return this.recipes.slice()[index]; //splice returns copy of array
    }

    addRecipe(recipe: Recipe){

        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice()); // emits a new array value after the change

    }

    updateRecipe(index: number, newRecipe: Recipe){

        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());

    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}