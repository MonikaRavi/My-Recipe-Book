import { NgModule } from "@angular/core";
import { DropDownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [DropDownDirective], // directive should be declared atleast and only once
    exports: [
        CommonModule, // importing common module is not necessary
        DropDownDirective
    ]
})

export class SharedModule{}