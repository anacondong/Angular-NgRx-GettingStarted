import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Member } from '../member';

@Component({
  selector: 'pm-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListComponent {
  pageTitle = 'Members';

  @Input() errorMessage: string;
  @Input() members: Member[];
  @Input() displayCode: boolean;
  @Input() selectedMember: Member;
  @Output() displayCodeChanged = new EventEmitter<void>();
  @Output() initializeNewMember = new EventEmitter<void>();
  @Output() memberWasSelected = new EventEmitter<Member>();

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newMember(): void {
    this.initializeNewMember.emit();
  }

  memberSelected(member: Member): void {
    this.memberWasSelected.emit(member);
  }

}
