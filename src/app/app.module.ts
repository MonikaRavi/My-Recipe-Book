import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http';
import { HttpClientModule  } from '@angular/common/http'

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HttpClient } from 'selenium-webdriver/http';

import {  StoreModule }  from '@ngrx/store'
import { reducers } from './AppStore/app.reducer'
import {  EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [   //components , directives , pipes that the module use ; directives cannot be declared in more than 1 module
    AppComponent


  ],
  imports: [  // other modules used by the module ; modules can be imported in multiple modules
    BrowserModule.withServerTransition({appId: 'recipebook-app'}), // contains all features of common module and other modules only needed for app starting
    //HttpModule,
    HttpClientModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers) // ngRx will setup a store, register the shoppingList reducer and initial state as the one piece of state for the overall application
  
  ],
  //providers in core module
  bootstrap: [AppComponent]  //root component - starting point of what we see 
})
export class AppModule { }
