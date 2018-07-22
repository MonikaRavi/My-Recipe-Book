import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

import { AuthGuardService } from "./auth/auth-guard.service";
import { HomeComponent } from "./core/home/home.component";

const appRoutes: Routes = [

    //Other routes in their respective modules
    { path: '', component: HomeComponent },
    { path: 'recipes',loadChildren:'./recipes/recipes.module#RecipesModule'}, //lazy loading
    { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService] },
    {path: '**', redirectTo:'', pathMatch:'full'}

];

@NgModule({   // Ng Module takes javascript as object

    imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules, useHash: true})], // preloads modules which are loaded lazily
    exports: [RouterModule]

})

export class AppRoutingModule {


}