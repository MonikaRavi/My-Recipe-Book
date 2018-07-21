
import { Ingredient } from '../../shared/ingredient.model';

import * as ShoppingListActions from './shopping-list.actions'



export interface State {

    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;

}


const initialState: State = {   //defining initial state as there will be no initial state when application starts 
    ingredients: [
        new Ingredient('Rice', 4),
        new Ingredient('Black gram', 1)
    ],

    editedIngredient: null,

    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {   //gets triggered when an action is dispatched ; state is the current state

    //return the new state of the application coz, reducers updates the state ; NgRx will replace the existing with new one at the backend

    switch (action.type) {  //could be multiple actions getting dispatched

        /***** ADD INGREDIENT ********** */

        case ShoppingListActions.ADD_INGREDIENT:  // state gets changed when an ingredient is added

            return {
                ...state,  //... is a spread operator that expands the old state  
                ingredients: [...state.ingredients, action.payload]  // adding new element from action to the existing ; by default action has no payload property but only type ; to get the data, define a clearly types Actions

            };

        /***** ADD INGREDIENTS ********** */

        case ShoppingListActions.ADD_INGREDIENTS:

        

            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };

        /***** UPDATE INGREDIENTS ********** */

        case ShoppingListActions.UPDATE_INGREDIENTS:
        let emptyIngredients = []
        return {
            ...state,
            ingredients: [...emptyIngredients, ...action.payload]
        };

        /***** UPDATE INGREDIENT ********** */

        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex]  // get current ingredient i.e., before update

            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient   // update the ingredient
            }

            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1

            };

        /***** DELETE INGREDIENT ********** */

        case ShoppingListActions.DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: oldIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        /***** START EDIT ********** */

        case ShoppingListActions.START_EDIT:
            const editedIngredient = { ...state.ingredients[action.payload] }

            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            }


        /***** STOP EDIT ********** */

        case ShoppingListActions.STOP_EDIT:

            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }


        default:
            return state;
    }

}     