import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from '../state/app.state';
import { getMaskUserName } from './state/user.reducer';
import { UserPageActions } from './state/actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  // OnInit state
  pageTitle = 'Log In';

  maskUserName$: Observable<boolean>;

  constructor(private store: Store<State>, private authService: AuthService, private router: Router) { } // use store, auth service, router

  ngOnInit(): void { // init state
    this.maskUserName$ = this.store.select(getMaskUserName);
  }

  cancel(): void { // when cancel
    this.router.navigate(['welcome']);
  }

  checkChanged(): void { // when Action
    this.store.dispatch(UserPageActions.maskUserName());
  }

  login(loginForm: NgForm): void { // function link NgForm login >>  login.component.html >> (ngSubmit)="login(loginForm)"
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl); // navigate to auth service
      } else {
        this.router.navigate(['/products']); // sucess to products page
      }
    }
  }
}
