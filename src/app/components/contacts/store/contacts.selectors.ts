import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './contacts.reducer';

const contactsSelector = createFeatureSelector<fromStore.ContactState>(fromStore.contactsFeatureKey);

export const isLoading = createSelector(contactsSelector, fromStore.selectIsLoading);
export const contacts = createSelector(contactsSelector, fromStore.selectAll);
export const error = createSelector(contactsSelector, fromStore.selectError);

export const selectUserIds = createSelector(contactsSelector, fromStore.selectUserIds);

export const selectUserEntities = createSelector(contactsSelector, fromStore.selectUserEntities);
export const selectAllUsers = createSelector(contactsSelector, fromStore.selectAllUsers);
export const selectUserTotal = createSelector(contactsSelector, fromStore.selectUserTotal);
export const selectCurrentUserId = createSelector(contactsSelector, fromStore.getSelectedUserId);

export const selectCurrentUser = createSelector(
    selectUserEntities,
    selectCurrentUserId,
    (userEntities, userId) => userId && userEntities[userId]
);