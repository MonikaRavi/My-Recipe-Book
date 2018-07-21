import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';



  ngOnInit(){    

    //initializing firebase app when Application is initialized

    firebase.initializeApp({
      apiKey: "AIzaSyBjs152BPl8vp_i42uxBymmJetecuLaX2o",
    authDomain: "ng-recipes-books.firebaseapp.com"
    });

  }



}
