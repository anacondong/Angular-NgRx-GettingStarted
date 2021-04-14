import { Book } from '../../book';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const toggleBookCode = createAction(
  '[Book Page] Toggle Book Code'
);

export const setCurrentBook = createAction(
  '[Book Page] Set Current Book',
  props<{ currentBookId: number }>()
);

export const clearCurrentBook = createAction(
  '[Book Page] Clear Current Book'
);

export const initializeCurrentBook = createAction(
  '[Book Page] Initialize Current Book'
);

export const loadBooks = createAction(
  '[Book Page] Load'
);

export const updateBook = createAction(
  '[Book Page] Update Book',
  props<{ book: Book }>()
);

export const createBook = createAction(
  '[Book Page] Create Book',
  props<{ book: Book }>()
);

export const deleteBook = createAction(
  '[Book Page] Delete Book',
  props<{ bookId: number }>()
);
