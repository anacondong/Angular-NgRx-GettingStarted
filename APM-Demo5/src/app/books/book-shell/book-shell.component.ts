import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../book';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getShowBookCode, getCurrentBook, getBooks, getError } from '../state';

import { BookPageActions } from '../state/actions';

@Component({
  templateUrl: './book-shell.component.html'
})
export class BookShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  selectedBook$: Observable<Book>;
  books$: Observable<Book[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.books$ = this.store.select(getBooks);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(BookPageActions.loadBooks());

    // Do NOT subscribe here because it uses an async pipe
    this.selectedBook$ = this.store.select(getCurrentBook);

    // Do NOT subscribe here because it uses an async pipe
    this.displayCode$ = this.store.select(getShowBookCode);
  }

  checkChanged(): void {
    this.store.dispatch(BookPageActions.toggleBookCode());
  }

  newBook(): void {
    this.store.dispatch(BookPageActions.initializeCurrentBook());
  }

  bookSelected(book: Book): void {
    this.store.dispatch(BookPageActions.setCurrentBook({ currentBookId: book.id }));
  }

  deleteBook(book: Book): void {
    this.store.dispatch(BookPageActions.deleteBook({ bookId: book.id }));
  }

  clearBook(): void {
    this.store.dispatch(BookPageActions.clearCurrentBook());
  }
  saveBook(book: Book): void {
    this.store.dispatch(BookPageActions.createBook({ book }));
  }

  updateBook(book: Book): void {
    this.store.dispatch(BookPageActions.updateBook({ book }));
  }
}
