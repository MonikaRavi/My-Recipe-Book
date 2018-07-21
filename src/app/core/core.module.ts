import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { AuthGuardService } from "../auth/auth-guard.service";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../shared/auth.intreceptor";
import { LoggingInterceptor } from "../shared/logging.interceptor";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],

    imports: [
        SharedModule,
        CommonModule,
        AppRoutingModule
    ],

    exports: [
        AppRoutingModule,
        HeaderComponent //coz, using header component in app component html

    ],

    providers: [
        RecipeService,
        DataStorageService,
        AuthService,
        AuthGuardService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},  //interceptors will handle every request app sends instead of Angular handling it by default
        {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    ]
})

export class CoreModule { }