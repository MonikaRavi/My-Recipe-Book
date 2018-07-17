import { NgModule, Component } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { AuthGuardService } from "./auth/auth-guard.service";

const appRoutes: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    {
        path: 'recipes', component: RecipesComponent, children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent },  //id is a parameter used to load routes dynamically
            { path: ':id/edit', component: RecipeEditComponent } //will determine if we are in edit mode or not
        ], canActivate:[AuthGuardService]
    },
    { path: 'shopping-list', component: ShoppingListComponent , canActivate:[AuthGuardService] },
    {path: 'signup' , component: SignupComponent},
    {path: 'signin' , component: SigninComponent},
    {path: '**', redirectTo:'/signin', pathMatch:'full'}

];

@NgModule({   // Ng Module takes javascript as object

    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})

export class AppRoutingModule {


}