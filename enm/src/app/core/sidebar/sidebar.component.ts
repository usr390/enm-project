// angular imports
import { Component } from '@angular/core';
// 3rd party imports
import { Store } from '@ngrx/store';
// enm imports
import { AuthState } from 'src/app/state/auth/auth.state';
import * as AuthActions from './../../state/auth/auth.actions';
import * as AuthSelectors from './../../state/auth/auth.selectors';
import { take } from 'rxjs';

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

  showPlusLink(): boolean {
    let user: any;
    this.user$.pipe(take(1)).subscribe(u => user = u); // Subscribe to the user$ Observable to get the latest value

    // Return true if user is not logged in or user is not a plus member
    return !user || !user.plus;
  }
}
