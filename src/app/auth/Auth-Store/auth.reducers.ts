
import * as AuthActions from './auth.actions'

export interface State {

    token: string;  //token retrieved from Firebase
    authenticated: boolean;

}

const initialState: State = {   //defining initial state as there will be no initial state when application starts 
    token: null,
    authenticated: false
};

export function AuthReducers(state = initialState, action: AuthActions.AuthActions) {

    switch (action.type) {

        case (AuthActions.SIGNUP):
        return {
            ...state,
            authenticated: false
        };
        case (AuthActions.SIGNIN):
            return {
                ...state,
                authenticated: true
            };

        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            };
case (AuthActions.SET_TOKEN):
return {
    ...state,
    token: action.payload
}

    }

    return state;
}