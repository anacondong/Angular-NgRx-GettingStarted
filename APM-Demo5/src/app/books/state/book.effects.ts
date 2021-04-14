import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookService } from '../book.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookPageActions, BookApiActions } from './actions';

@Injectable()
export class BookEffects {

  constructor(private actions$: Actions, private bookService: BookService) { }

  loadBooks$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BookPageActions.loadBooks),
        mergeMap(() => this.bookService.getBooks()
          .pipe(
            map(books => BookApiActions.loadBooksSuccess({ books })),
            catchError(error => of(BookApiActions.loadBooksFailure({ error })))
          )
        )
      );
  });

  updateBook$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BookPageActions.updateBook),
        concatMap(action =>
          this.bookService.updateBook(action.book)
            .pipe(
              map(book => BookApiActions.updateBookSuccess({ book })),
              catchError(error => of(BookApiActions.updateBookFailure({ error })))
            )
        )
      );
  });

  createBook$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BookPageActions.createBook),
        concatMap(action =>
          this.bookService.createBook(action.book)
            .pipe(
              map(book => BookApiActions.createBookSuccess({ book })),
              catchError(error => of(BookApiActions.createBookFailure({ error })))
            )
        )
      );
  });

  deleteBook$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BookPageActions.deleteBook),
        mergeMap(action =>
          this.bookService.deleteBook(action.bookId).pipe(
            map(() => BookApiActions.deleteBookSuccess({ bookId: action.bookId })),
            catchError(error => of(BookApiActions.deleteBookFailure({ error })))
          )
        )
      );
  });
}
