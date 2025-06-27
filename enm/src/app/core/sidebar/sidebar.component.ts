// angular imports
import { Component } from '@angular/core';
// 3rd party imports
import { Store } from '@ngrx/store';
// enm imports
import { AuthState } from 'src/app/state/auth/auth.state';
import * as AuthActions from './../../state/auth/auth.actions';
import * as AuthSelectors from './../../state/auth/auth.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {

  constructor(private store$: Store<AuthState>) {}

  user$ = this.store$.select(AuthSelectors.selectUser);

  sidebarVisible = false;
  currentDate = new Date();

  onLogOut() {
    this.store$.dispatch(AuthActions.logOut());
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }
  
}
