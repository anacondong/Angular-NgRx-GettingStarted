import { Member } from '../../member';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const toggleMemberCode = createAction(
  '[Member Page] Toggle Member Code'
);

export const setCurrentMember = createAction(
  '[Member Page] Set Current Member',
  props<{ currentMemberId: number }>()
);

export const clearCurrentMember = createAction(
  '[Member Page] Clear Current Member'
);

export const initializeCurrentMember = createAction(
  '[Member Page] Initialize Current Member'
);

export const loadMembers = createAction(
  '[Member Page] Load'
);

export const updateMember = createAction(
  '[Member Page] Update Member',
  props<{ member: Member }>()
);

export const createMember = createAction(
  '[Member Page] Create Member',
  props<{ member: Member }>()
);

export const deleteMember = createAction(
  '[Member Page] Delete Member',
  props<{ memberId: number }>()
);
