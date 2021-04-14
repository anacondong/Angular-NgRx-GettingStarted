import { Member } from '../../member';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const loadMembersSuccess = createAction(
  '[Member API] Load Success',
  props<{ members: Member[] }>()
);

export const loadMembersFailure = createAction(
  '[Member API] Load Fail',
  props<{ error: string }>()
);

export const updateMemberSuccess = createAction(
  '[Member API] Update Member Success',
  props<{ member: Member }>()
);

export const updateMemberFailure = createAction(
  '[Member API] Update Member Fail',
  props<{ error: string }>()
);

export const createMemberSuccess = createAction(
  '[Member API] Create Member Success',
  props<{ member: Member }>()
);

export const createMemberFailure = createAction(
  '[Member API] Create Member Fail',
  props<{ error: string }>()
);

export const deleteMemberSuccess = createAction(
  '[Member API] Delete Member Success',
  props<{ memberId: number }>()
);

export const deleteMemberFailure = createAction(
  '[Member API] Delete Member Fail',
  props<{ error: string }>()
);
