import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { BookState } from './book.reducer';

// Extends the app state to include the book feature.
// This is required because Books are lazy loaded.
// So the reference to BookState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
    Books: BookState;
}

// Selector functions
const getBookFeatureState = createFeatureSelector<BookState>('Books');

export const getShowBookCode = createSelector(
    getBookFeatureState,
    state => state.showBookCode
);

export const getCurrentBookId = createSelector(
    getBookFeatureState,
    state => state.currentBookId
);

export const getCurrentBook = createSelector(
    getBookFeatureState,
    getCurrentBookId,
    (state, currentBookId) => {
        if (currentBookId === 0) {
            return {
                id: 0,
                bookName: '',
                bookCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currentBookId ? state.Books.find(p => p.id === currentBookId) : null;
        }
    }
);

export const getBooks = createSelector(
    getBookFeatureState,
    state => state.Books
);

export const getError = createSelector(
    getBookFeatureState,
    state => state.error
);
