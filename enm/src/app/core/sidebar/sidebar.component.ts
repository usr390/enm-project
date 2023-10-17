import { Component } from '@angular/core';
import * as fromAuth from './../../state/auth/auth.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './../../state/auth/auth.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  currentDate = new Date();

  user$ = this.store.select(fromAuth.selectUser);

  constructor(private store: Store<fromAuth.AuthState>) {}

  onLogOut() {
    this.store.dispatch(AuthActions.logOut());
  }
}
