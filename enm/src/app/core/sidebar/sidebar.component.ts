import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './../../state/auth/auth.actions';
import * as AuthSelectors from './../../state/auth/auth.selectors';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  currentDate = new Date();

  user$ = this.store.select(AuthSelectors.selectUser);

  constructor(private store: Store<AuthState>) {}

  onLogOut() {
    this.store.dispatch(AuthActions.logOut());
  }
}
