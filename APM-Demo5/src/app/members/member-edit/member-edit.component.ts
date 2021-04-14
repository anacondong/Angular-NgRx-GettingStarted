import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Member } from '../member';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';

@Component({
  selector: 'pm-member-edit',
  templateUrl: './member-edit.component.html'
})
export class MemberEditComponent implements OnInit, OnChanges {
  pageTitle = 'Member Edit';
  @Input() errorMessage: string;
  @Input() selectedMember: Member;
  @Output() create = new EventEmitter<Member>();
  @Output() update = new EventEmitter<Member>();
  @Output() delete = new EventEmitter<Member>();
  @Output() clearCurrent = new EventEmitter<void>();

  memberForm: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      memberName: {
        required: 'Member name is required.',
        minlength: 'Member name must be at least three characters.',
        maxlength: 'Member name cannot exceed 50 characters.'
      },
      memberCode: {
        required: 'Member code is required.'
      },
      starRating: {
        range: 'Rate the member between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.memberForm = this.fb.group({
      memberName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      memberCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // Watch for value changes for validation
    this.memberForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.memberForm)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // patch form with value from the store
    if (changes.selectedMember) {
      const member = changes.selectedMember.currentValue as Member;
      this.displayMember(member);
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.memberForm);
  }

  displayMember(member: Member | null): void {
    if (member && this.memberForm) {
      // Reset the form back to pristine
      this.memberForm.reset();

      // Display the appropriate page title
      if (member.id === 0) {
        this.pageTitle = 'Add Member';
      } else {
        this.pageTitle = `Edit Member: ${member.memberName}`;
      }

      // Update the data on the form
      this.memberForm.patchValue({
        memberName: member.memberName,
        memberCode: member.memberCode,
        starRating: member.starRating,
        description: member.description
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected member
    // replacing any edits made
    this.displayMember(this.selectedMember);
  }

  deleteMember(): void {
    if (this.selectedMember && this.selectedMember.id) {
      if (confirm(`Really delete the member: ${this.selectedMember.memberName}?`)) {
        this.delete.emit(this.selectedMember);
      }
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  saveMember(): void {
    if (this.memberForm.valid) {
      if (this.memberForm.dirty) {
        // Copy over all of the original member properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const member = { ...this.selectedMember, ...this.memberForm.value };

        if (member.id === 0) {
          this.create.emit(member);
        } else {
          this.update.emit(member);
        }
      }
    }
  }

}
