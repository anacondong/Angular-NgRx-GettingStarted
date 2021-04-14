import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'pm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent {
  pageTitle = 'Books';

  @Input() errorMessage: string;
  @Input() books: Book[];
  @Input() displayCode: boolean;
  @Input() selectedBook: Book;
  @Output() displayCodeChanged = new EventEmitter<void>();
  @Output() initializeNewBook = new EventEmitter<void>();
  @Output() bookWasSelected = new EventEmitter<Book>();

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newBook(): void {
    this.initializeNewBook.emit();
  }

  bookSelected(book: Book): void {
    this.bookWasSelected.emit(book);
  }

}
