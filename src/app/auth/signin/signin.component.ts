import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  logInTry = false;

  authenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm){

    const email = form.value.email;
    const password = form.value.password;

    this.authService.signInUser(email,password);

    setTimeout(() => {
      this.authenticated = true;
    }, 1500);

    this.logInTry = true;

  }

  


}
