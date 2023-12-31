import { Component } from '@angular/core';
import { UserService } from './core/services/user.service';
import { AppState } from './state/app.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as AuthActions from './state/auth/auth.actions';
import * as AuthSelectors from './state/auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'enm';

  currentUser$ = this.store$.select(AuthSelectors.selectUser)

  constructor(private store$: Store<AppState>, private userService: UserService) {}

  ngOnInit() {
    this.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        const credentials = {
          username: user.username
        }
        this.store$.dispatch(AuthActions.refreshUserRequest({ credentials }))
      }
    })
  }

}
