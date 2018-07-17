import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {


    token: string;

    errorMessage: string;

    constructor(private router: Router){
        
        
    }

    signUpUser(email: string, password: string) {

       

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                response => {
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
                    this.router.navigate(['/recipes']);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.token = token;
                               // console.log(this.token);
                            }
                        )
                }
            )
            .catch(
                error => {
                    this.errorMessage = error.message;
                }
            );
    }

    logOut() {

        firebase.auth().signOut();
        this.token = null;
        this.router.navigate(['/']);
        
    }

    getToken() {

        // getIdToken() retruns a promise ; doesnt wait for the token to get retrieved from server ; might return an expired token

        firebase.auth().currentUser.getIdToken()   // async action => firebase not only gets the token from local storage (sync) but also checks if it is valid and if it is invalid becuase it expired, it gets a new token from server (async)
            .then(
                (token: string) => {
                    this.token = token
                }
            );

            return this.token;
    }

    isAuthenticated(){
        //returns true if authenticated
        return this.token != null;
    }

    deleteUser(){

        firebase.auth().currentUser.delete();
    }

}