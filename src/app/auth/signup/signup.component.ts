import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';

import * as appReducers from '../../AppStore/app.reducer';
import * as authActions from '../Auth-Store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error = '';

  constructor( private authService: AuthService , private store: Store<appReducers.AppState>) { }

  ngOnInit() {

    this.authService.errorMessage='';

  }


  onSignUp(form: NgForm){

    const email = form.value.email;
    const password = form.value.password;

    
this.authService.signUpUser(email,password);

setTimeout(() => {
  this.error = this.authService.getError();
    }, 1000); 

  }

}
