import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MemberShellComponent } from './member-shell/member-shell.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberEditComponent } from './member-edit/member-edit.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { MemberReducer } from './state/member.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MemberEffects } from './state/member.effects';

const MemberRoutes: Routes = [
  { path: '', component: MemberShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(MemberRoutes),
    StoreModule.forFeature('Members', MemberReducer),
    EffectsModule.forFeature([MemberEffects])
  ],
  declarations: [
    MemberShellComponent,
    MemberListComponent,
    MemberEditComponent
  ]
})
export class MemberModule { }
