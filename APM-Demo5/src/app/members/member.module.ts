import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MemberModuleComponent } from './member-module/member-module.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberEditComponent } from './member-edit/member-edit.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { MemberReducer } from './state/member.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MemberEffects } from './state/member.effects';



const MemberRoutes: Routes = [
  { path: '', component: MemberModuleComponent } // call to member module component
];

@NgModule({  // define this to be Module to be contain component
  imports: [
    SharedModule,
    RouterModule.forChild(MemberRoutes), // router module
    StoreModule.forFeature('Members', MemberReducer), // Store Module
    EffectsModule.forFeature([MemberEffects]) // support when even has been activate
  ],
  declarations: [  //The set of components, directives, and pipes (declarables) that belong to this module.
    MemberModuleComponent, // contain component
    MemberListComponent,
    MemberEditComponent
  ]
})
export class MemberModule { }
