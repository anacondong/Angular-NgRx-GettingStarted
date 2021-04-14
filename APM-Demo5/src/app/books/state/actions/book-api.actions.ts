import { Book } from '../../book';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const loadBooksSuccess = createAction(
  '[Book API] Load Success',
  props<{ books: Book[] }>()
);

export const loadBooksFailure = createAction(
  '[Book API] Load Fail',
  props<{ error: string }>()
);

export const updateBookSuccess = createAction(
  '[Book API] Update Book Success',
  props<{ book: Book }>()
);

export const updateBookFailure = createAction(
  '[Book API] Update Book Fail',
  props<{ error: string }>()
);

export const createBookSuccess = createAction(
  '[Book API] Create Book Success',
  props<{ book: Book }>()
);

export const createBookFailure = createAction(
  '[Book API] Create Book Fail',
  props<{ error: string }>()
);

export const deleteBookSuccess = createAction(
  '[Book API] Delete Book Success',
  props<{ bookId: number }>()
);

export const deleteBookFailure = createAction(
  '[Book API] Delete Book Fail',
  props<{ error: string }>()
);
