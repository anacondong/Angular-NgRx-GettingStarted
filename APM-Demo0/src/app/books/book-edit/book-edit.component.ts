import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Book } from '../book';
import { BookService } from '../book.service';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';

@Component({
  selector: 'pm-book-edit',
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Book Edit';
  errorMessage = '';
  bookForm: FormGroup;

  book: Book | null;
  sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private bookService: BookService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      bookName: {
        required: 'Book name is required.',
        minlength: 'Book name must be at least three characters.',
        maxlength: 'Book name cannot exceed 50 characters.'
      },
      bookCode: {
        required: 'Book code is required.'
      },
      starRating: {
        range: 'Rate the book between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.bookForm = this.fb.group({
      bookName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      bookCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // Watch for changes to the currently selected book
    this.sub = this.bookService.selectedBookChanges$.subscribe(
      currentBook => this.displayBook(currentBook)
    );

    // Watch for value changes for validation
    this.bookForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.bookForm)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.bookForm);
  }

  displayBook(book: Book | null): void {
    // Set the local book property
    this.book = book;

    if (book) {
      // Reset the form back to pristine
      this.bookForm.reset();

      // Display the appropriate page title
      if (book.id === 0) {
        this.pageTitle = 'Add Book';
      } else {
        this.pageTitle = `Edit Book: ${book.bookName}`;
      }

      // Update the data on the form
      this.bookForm.patchValue({
        bookName: book.bookName,
        bookCode: book.bookCode,
        starRating: book.starRating,
        description: book.description
      });
    }
  }

  cancelEdit(book: Book): void {
    // Redisplay the currently selected book
    // replacing any edits made
    this.displayBook(book);
  }

  deleteBook(book: Book): void {
    if (book && book.id) {
      if (confirm(`Really delete the book: ${book.bookName}?`)) {
        this.bookService.deleteBook(book.id).subscribe({
          next: () => this.bookService.changeSelectedBook(null),
          error: err => this.errorMessage = err
        });
      }
    } else {
      // No need to delete, it was never saved
      this.bookService.changeSelectedBook(null);
    }
  }

  saveBook(originalBook: Book): void {
    if (this.bookForm.valid) {
      if (this.bookForm.dirty) {
        // Copy over all of the original book properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const book = { ...originalBook, ...this.bookForm.value };

        if (book.id === 0) {
          this.bookService.createBook(book).subscribe({
            next: p => this.bookService.changeSelectedBook(p),
            error: err => this.errorMessage = err
          });
        } else {
          this.bookService.updateBook(book).subscribe({
            next: p => this.bookService.changeSelectedBook(p),
            error: err => this.errorMessage = err
          });
        }
      }
    }
  }

}
