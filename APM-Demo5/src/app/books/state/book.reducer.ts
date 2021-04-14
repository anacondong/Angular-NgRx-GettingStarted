import { Book } from '../book';

/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { BookApiActions, BookPageActions } from './actions';

// State for this feature (Book)
export interface BookState {
  showBookCode: boolean;
  currentBookId: number | null;
  Books: Book[];
  error: string;
}

const initialState: BookState = {
  showBookCode: true,
  currentBookId: null,
  Books: [],
  error: ''
};

export const BookReducer = createReducer<BookState>(
  initialState,
  on(BookPageActions.toggleBookCode, (state): BookState => {
    return {
      ...state,
      showBookCode: !state.showBookCode
    };
  }),
  on(BookPageActions.setCurrentBook, (state, action): BookState => {
    return {
      ...state,
      currentBookId: action.currentBookId
    };
  }),
  on(BookPageActions.clearCurrentBook, (state): BookState => {
    return {
      ...state,
      currentBookId: null
    };
  }),
  on(BookPageActions.initializeCurrentBook, (state): BookState => {
    return {
      ...state,
      currentBookId: 0
    };
  }),
  on(BookApiActions.loadBooksSuccess, (state, action): BookState => {
    return {
      ...state,
      Books: action.books,
      error: ''
    };
  }),
  on(BookApiActions.loadBooksFailure, (state, action): BookState => {
    return {
      ...state,
      Books: [],
      error: action.error
    };
  }),
  on(BookApiActions.updateBookSuccess, (state, action): BookState => {
    const updatedBooks = state.Books.map(
      item => action.book.id === item.id ? action.book : item);
    return {
      ...state,
      Books: updatedBooks,
      currentBookId: action.book.id,
      error: ''
    };
  }),
  on(BookApiActions.updateBookFailure, (state, action): BookState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a create, the currentBook is the new book.
  on(BookApiActions.createBookSuccess, (state, action): BookState => {
    return {
      ...state,
      Books: [...state.Books, action.book],
      currentBookId: action.book.id,
      error: ''
    };
  }),
  on(BookApiActions.createBookFailure, (state, action): BookState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a delete, the currentBook is null.
  on(BookApiActions.deleteBookSuccess, (state, action): BookState => {
    return {
      ...state,
      Books: state.Books.filter(book => book.id !== action.bookId),
      currentBookId: null,
      error: ''
    };
  }),
  on(BookApiActions.deleteBookFailure, (state, action): BookState => {
    return {
      ...state,
      error: action.error
    };
  })
);