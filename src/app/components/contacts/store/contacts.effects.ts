import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map , delay } from 'rxjs/operators';
import { ContactsService } from 'src/app/components/contacts/service/contacts.service';
import { loadContacts, requestLoadContacts } from './contacts.actions';

@Injectable()
export class ContactEffects {

  constructor(private actions$: Actions, private service: ContactsService) {}

  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadContacts),
      switchMap(action =>
        this.service.load().pipe(
          map(data => loadContacts({contacts: data}))
      ))
    )
  );
}