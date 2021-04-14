import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Book } from '../book';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';

@Component({
  selector: 'pm-book-edit',
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit, OnChanges {
  pageTitle = 'Book Edit';
  @Input() errorMessage: string;
  @Input() selectedBook: Book;
  @Output() create = new EventEmitter<Book>();
  @Output() update = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<Book>();
  @Output() clearCurrent = new EventEmitter<void>();

  bookForm: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
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

    // Watch for value changes for validation
    this.bookForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.bookForm)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // patch form with value from the store
    if (changes.selectedBook) {
      const book = changes.selectedBook.currentValue as Book;
      this.displayBook(book);
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.bookForm);
  }

  displayBook(book: Book | null): void {
    if (book && this.bookForm) {
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

  cancelEdit(): void {
    // Redisplay the currently selected book
    // replacing any edits made
    this.displayBook(this.selectedBook);
  }

  deleteBook(): void {
    if (this.selectedBook && this.selectedBook.id) {
      if (confirm(`Really delete the book: ${this.selectedBook.bookName}?`)) {
        this.delete.emit(this.selectedBook);
      }
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  saveBook(): void {
    if (this.bookForm.valid) {
      if (this.bookForm.dirty) {
        // Copy over all of the original book properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const book = { ...this.selectedBook, ...this.bookForm.value };

        if (book.id === 0) {
          this.create.emit(book);
        } else {
          this.update.emit(book);
        }
      }
    }
  }

}
