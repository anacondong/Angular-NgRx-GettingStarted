import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { MemberState } from './member.reducer';

// Extends the app state to include the member feature.
// This is required because Members are lazy loaded.
// So the reference to MemberState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
    Members: MemberState;
}

// Selector functions
const getMemberFeatureState = createFeatureSelector<MemberState>('Members');

export const getShowMemberCode = createSelector(
    getMemberFeatureState,
    state => state.showMemberCode
);

export const getCurrentMemberId = createSelector(
    getMemberFeatureState,
    state => state.currentMemberId
);

export const getCurrentMember = createSelector(
    getMemberFeatureState,
    getCurrentMemberId,
    (state, currentMemberId) => {
        if (currentMemberId === 0) {
            return {
                id: 0,
                memberName: '',
                memberCode: 'New',
                description: '',
                starRating: 0,
                email: '',
                name: '',
                password: '',
            };
        } else {
            return currentMemberId ? state.Members.find(p => p.id === currentMemberId) : null;
        }
    }
);

export const getMembers = createSelector(
    getMemberFeatureState,
    state => state.Members
);

export const getError = createSelector(
    getMemberFeatureState,
    state => state.error
);
