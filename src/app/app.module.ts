import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAngular } from './material.angular';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { CreateComponent } from './components/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    MaterialAngular,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
