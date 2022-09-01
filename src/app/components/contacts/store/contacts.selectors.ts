import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './contacts.reducer';

const contactsSelector = createFeatureSelector<fromStore.ContactState>(fromStore.contactsFeatureKey);

export const isLoading = createSelector(contactsSelector, fromStore.selectIsLoading);
export const contacts = createSelector(contactsSelector, fromStore.selectAll);
export const error = createSelector(contactsSelector, fromStore.selectError);