import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'pm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  pageTitle = 'Books';
  errorMessage: string;

  displayCode: boolean;

  books: Book[];

  // Used to highlight the selected book in the list
  selectedBook: Book | null;
  sub: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.sub = this.bookService.selectedBookChanges$.subscribe(
      currentBook => this.selectedBook = currentBook
    );

    this.bookService.getBooks().subscribe({
      next: (books: Book[]) => this.books = books,
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.displayCode = !this.displayCode;
  }

  newBook(): void {
    this.bookService.changeSelectedBook(this.bookService.newBook());
  }

  bookSelected(book: Book): void {
    this.bookService.changeSelectedBook(book);
  }

}
