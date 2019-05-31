import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import * as fromAuth from './auth/store/auth.actions';

import { User } from './auth/models/user.model';
import { getUser, getIsLoggedIn, getIsLoading, getIsAdmin } from './auth/store/auth.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'SIMPUBU - DIREKTORAT BANDAR UDARA';

  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.user$ = this.store.select(getUser);
    this.isLoggedIn$ = this.store.select(getIsLoggedIn);
    this.isLoading$ = this.store.select(getIsLoading);
    this.isAdmin$ = this.store.select(getIsAdmin);
  }

  onLogout(user: User) {
    this.store.dispatch(new fromAuth.LogoutRequested( { user }));
  }
}
