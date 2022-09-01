import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialAngular } from "src/app/material.angular";
import { AuthorizationRoutingModule } from "./authorization-routing.module";
import { AuthorizationComponent } from "./authorization.component";


@NgModule({
    declarations: [
        AuthorizationComponent
    ],
    imports: [
        CommonModule,
        MaterialAngular,
        AuthorizationRoutingModule
    ]
})

export class AuthorizationModule { }