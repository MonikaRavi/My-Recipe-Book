
import * as shoppingListReducer from '../shopping-list/ngRx-store/shopping-list.reducers'

import * as authReducer from '../auth/Auth-Store/auth.reducers'
import { ActionReducerMap } from '@ngrx/store';



export interface AppState {
    shoppingList: shoppingListReducer.State;
    auth: authReducer.State;
} 

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer.shoppingListReducer,
    auth: authReducer.AuthReducers
};