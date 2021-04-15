import { Member } from '../member';

/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { MemberApiActions, MemberPageActions } from './actions';

// State for this feature (Member)
export interface MemberState {
  showMemberCode: boolean;
  currentMemberId: number | null;
  Members: Member[];
  error: string;
}

const initialState: MemberState = {
  showMemberCode: true,
  currentMemberId: null,
  Members: [],
  error: ''
};

export const MemberReducer = createReducer<MemberState>( // create Member Reducer
  initialState,
  // member Page Action
  on(MemberPageActions.toggleMemberCode, (state): MemberState => {
    return {
      ...state,
      showMemberCode: !state.showMemberCode
    };
  }),
  on(MemberPageActions.setCurrentMember, (state, action): MemberState => {
    return {
      ...state,
      currentMemberId: action.currentMemberId,
      error: ''
    };
  }),
  on(MemberPageActions.clearCurrentMember, (state): MemberState => {
    return {
      ...state,
      currentMemberId: null
    };
  }),
  on(MemberPageActions.initializeCurrentMember, (state): MemberState => {
    return {
      ...state,
      currentMemberId: 0,
      error: ''
    };
  }),

  // API action
  on(MemberApiActions.loadMembersSuccess, (state, action): MemberState => {
    return {
      ...state,
      Members: action.members,
      error: ''
    };
  }),
  on(MemberApiActions.loadMembersFailure, (state, action): MemberState => {
    return {
      ...state,
      Members: [],
      error: action.error
    };
  }),
  on(MemberApiActions.updateMemberSuccess, (state, action): MemberState => {
    const updatedMembers = state.Members.map(
      item => action.member.id === item.id ? action.member : item);
    return {
      ...state,
      Members: updatedMembers,
      currentMemberId: action.member.id,
      error: 'updateMemberSuccess'
    };
  }),
  on(MemberApiActions.updateMemberFailure, (state, action): MemberState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a create, the currentMember is the new member.
  on(MemberApiActions.createMemberSuccess, (state, action): MemberState => {
    return {
      ...state,
      Members: [...state.Members, action.member],
      currentMemberId: action.member.id,
      error: 'createMemberSuccess'
    };
  }),
  on(MemberApiActions.createMemberFailure, (state, action): MemberState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a delete, the currentMember is null.
  on(MemberApiActions.deleteMemberSuccess, (state, action): MemberState => {
    return {
      ...state,
      Members: state.Members.filter(member => member.id !== action.memberId),
      currentMemberId: null,
      error: ''
    };
  }),
  on(MemberApiActions.deleteMemberFailure, (state, action): MemberState => {
    return {
      ...state,
      error: action.error
    };
  })
);