import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Contact } from './contact';

import * as ContactActions from './contacts.actions';

export const contactsFeatureKey = 'contacts';

export interface ContactState extends EntityState<Contact> {
  isLoading: boolean;
  error: string | null;
  selectedContactId: number | null;
}

export function selectContactId(a: Contact): number {
  return a.id as number;
}

export const adapter: EntityAdapter<Contact> = createEntityAdapter<Contact>(
  {
    selectId: selectContactId
  }
);

export const initialState: ContactState = adapter.getInitialState({
  isLoading: true,
  error: null,
  selectedContactId: null
});

export const reducer = createReducer(
  initialState,
  on(ContactActions.addContact,
    (state, action) => adapter.addOne(action.contact, state)
  ),
  on(ContactActions.updateContact,
    (state, action) => adapter.updateOne(action.update, state)
  ),
  on(ContactActions.deleteContact,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ContactActions.loadContacts,
    (state, action) => adapter.setAll(action.contacts, {
        ...state,
        isLoading: false
    })
  ),
  on(ContactActions.requestLoadContacts,
    (state, action) => adapter.setAll([], {
      ...state,
      isLoading: true
  })
  )
);

export const getSelectedUserId = (state: ContactState) => state.selectedContactId;

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectIsLoading = (state: ContactState) => state.isLoading;
export const selectError = (state: ContactState) => state.error;

export const selectUserIds = selectIds;
export const selectUserEntities = selectEntities;
export const selectAllUsers = selectAll;
export const selectUserTotal = selectTotal;
