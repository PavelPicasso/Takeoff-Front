import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { AuthorizationComponent } from "./components/authorization/authorization.component";
import { ContactsComponent } from "./components/contacts/contacts.component";

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () => import('./components/authorization/authorization.module').then(m => m.AuthorizationModule)
    },
    {
        path: 'contacts',
        loadChildren: () => import('./components/contacts/contacts.module').then(m => m.ContactsModule)
    }
]
  
@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [AuthorizationComponent, ContactsComponent]