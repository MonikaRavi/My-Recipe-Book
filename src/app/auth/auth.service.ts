import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as appReducers from '../AppStore/app.reducer'

import * as authActions from '../auth/Auth-Store/auth.actions';

@Injectable()

export class AuthService {


    token: string;

    errorMessage = '';

    constructor(private router: Router, private store: Store<appReducers.AppState>) {


    }

    signUpUser(email: string, password: string) {



        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                response => {

                    this.store.dispatch(new authActions.SignUp()); //logging in using actions

                    this.router.navigate(['/signin']);
                }
            )
            .catch(
                error => {

                    this.errorMessage = error.message;
                }
            )

    }


    signInUser(email: string, password: string) {



        firebase.auth().signInWithEmailAndPassword(email, password)  // waits for a token to get retrieved from server
            .then(
                response => {
                    this.store.dispatch(new authActions.SignIn());
                    this.router.navigate(['/recipes']);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.token = token;
                                this.store.dispatch(new authActions.SetToken(token));
                                // console.log(this.token);
                            }
                        )
                }
            )
            .catch(
                error => {

                    //console.log(error.message);
                    this.errorMessage = error.message;
                }
            );


    }

    logOut() {

        firebase.auth().signOut();
        //this.token = null;
        this.store.dispatch(new authActions.LogOut()); //resets the token and auth state
        this.router.navigate(['/']);

    }

    getToken() {

        // getIdToken() retruns a promise ; doesnt wait for the token to get retrieved from server ; might return an expired token

        firebase.auth().currentUser.getIdToken()   // async action => firebase not only gets the token from local storage (sync) but also checks if it is valid and if it is invalid becuase it expired, it gets a new token from server (async)
            .then(
                (token: string) => {
                    this.token = token;
                }
            );

        return this.token;


    }

    // isAuthenticated() {
    //     //returns true if authenticated
    //     let checkToken = false;
    //     this.store.select('auth')
    //         .subscribe(
    //             data => {
    //                 checkToken = data.authenticated;
    //             }
    //         )

    //     return checkToken;
    // }

    getError() {

        return this.errorMessage;
    }

    deleteUser() {

        firebase.auth().currentUser.delete();
    }

}