import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MaterialAngular } from "src/app/material.angular";
import { CreateComponent } from "./components/create/create.component";
import { ContactsRoutingModule } from "./contacts-routing.module";
import { ContactsComponent } from "./contacts.component";
import { ContactEffects } from "./store/contacts.effects";
import * as fromContact from './store/contacts.reducer';

@NgModule({
    declarations: [
        ContactsComponent,
        CreateComponent
    ],
    imports: [
        CommonModule,
        MaterialAngular,
        ContactsRoutingModule,
        StoreModule.forFeature(fromContact.contactsFeatureKey, fromContact.reducer),
        EffectsModule.forFeature([ContactEffects]),
    ]
})

export class ContactsModule { }