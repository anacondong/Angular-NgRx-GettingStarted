import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Member } from '../member';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getShowMemberCode, getCurrentMember, getMembers, getError } from '../state';

import { MemberPageActions } from '../state/actions';

@Component({
  templateUrl: './member-shell.component.html'
})
export class MemberShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  selectedMember$: Observable<Member>;
  members$: Observable<Member[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.members$ = this.store.select(getMembers);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(MemberPageActions.loadMembers());

    // Do NOT subscribe here because it uses an async pipe
    this.selectedMember$ = this.store.select(getCurrentMember);

    // Do NOT subscribe here because it uses an async pipe
    this.displayCode$ = this.store.select(getShowMemberCode);
  }

  checkChanged(): void {
    this.store.dispatch(MemberPageActions.toggleMemberCode());
  }

  newMember(): void {
    this.store.dispatch(MemberPageActions.initializeCurrentMember());
  }

  memberSelected(member: Member): void {
    this.store.dispatch(MemberPageActions.setCurrentMember({ currentMemberId: member.id }));
  }

  deleteMember(member: Member): void {
    this.store.dispatch(MemberPageActions.deleteMember({ memberId: member.id }));
  }

  clearMember(): void {
    this.store.dispatch(MemberPageActions.clearCurrentMember());
  }
  saveMember(member: Member): void {
    this.store.dispatch(MemberPageActions.createMember({ member }));
  }

  updateMember(member: Member): void {
    this.store.dispatch(MemberPageActions.updateMember({ member }));
  }
}
