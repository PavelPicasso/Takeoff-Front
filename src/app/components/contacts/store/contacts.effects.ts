import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map , delay } from 'rxjs/operators';
import { ContactsService } from 'src/app/components/contacts/service/contacts.service';
import { loadContacts, requestLoadContacts } from './contacts.actions';

@Injectable()
export class ContactEffects {

  constructor(private actions$: Actions, private service: ContactsService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadContacts),
      switchMap(action =>
        this.service.load().pipe(
          delay(3000),
          map(data => loadContacts({contacts: data}))
      ))
    )
  );
}