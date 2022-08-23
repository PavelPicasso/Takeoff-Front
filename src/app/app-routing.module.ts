import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationComponent } from "./components/authorization/authorization.component";
import { ContactsComponent } from "./components/contacts/contacts.component";

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: AuthorizationComponent },
    { path: 'contacts', component: ContactsComponent }
]
  
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [AuthorizationComponent, ContactsComponent]