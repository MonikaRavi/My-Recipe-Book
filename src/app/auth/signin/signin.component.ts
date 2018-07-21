import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {



  error = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.errorMessage='';

  }

  onSignIn(form: NgForm){

    const email = form.value.email;
    const password = form.value.password;

     this.authService.signInUser(email,password);

    setTimeout(() => {
      this.error = this.authService.getError();
        }, 1000); 


      }
}
