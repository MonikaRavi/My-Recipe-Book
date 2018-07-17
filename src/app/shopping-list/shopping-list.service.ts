import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();

    startedEditing = new Subject<number>();

    private ingredients : Ingredient[] = [

        new Ingredient ('Rice',4),
        new Ingredient ('Black gram',1)
    
      ];
    
      getIngredients() {

        return this.ingredients.slice();

      }

      getIngredient(index: number) {

        return this.ingredients[index];

      }

      addIngredient(ingredient: Ingredient) {

        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());

      }

      addIngredients(ingredients: Ingredient[]){

        /*
        for(let ingredient of ingredients){

          this.addIngredient(ingredient);
        }*/

        this.ingredients.push(...ingredients); // spread operator; handles list of array as individual array; push hadles list of arrays as a single array
        this.ingredientsChanged.next(this.ingredients.slice());

      }


      updateIngredient(index: number, newIngredient: Ingredient) {

        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    
      }

      deleteIngredient(index: number) {
        
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());

      }

      setIngredients(ingredient: Ingredient[]) {
        this.ingredients = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

}