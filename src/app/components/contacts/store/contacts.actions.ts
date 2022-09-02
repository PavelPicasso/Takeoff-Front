import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Contact } from './contact';

export const requestLoadContacts = createAction(
  '[Contact/API] Request Load Contacts'
);

export const loadContacts = createAction(
  '[Contact/API] Load Contacts',
  props<{ contacts: Contact[] }>()
);

export const addContact = createAction(
  '[Contact/API] Add Contact',
  props<{ contact: Contact }>()
);

export const updateContact = createAction(
  '[Contact/API] Update Contact',
  props<{ update: Update<Contact> }>()
);

export const deleteContact = createAction(
  '[Contact/API] Delete Contact',
  props<{ id: number }>()
);