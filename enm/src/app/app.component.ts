import { Component } from '@angular/core';
import { UserService } from './core/services/user.service';
import { AppState } from './state/app.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as enmEventsActions from './state/enmEvents/enmEvents.actions';
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
  private lastTime!: number;
  private readonly inactivityThreshold = 300000; // 5 minutes of inactivity

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

    this.lastTime = new Date().getTime();
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  ngOnDestroy() {
    // Remove the event listener when the component is destroyed
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  }

  private handleVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      // When the tab is hidden, record the current time
      this.lastTime = new Date().getTime();
    } else {
      // When the tab is visible, compare the current time with the recorded time
      const currentTime = new Date().getTime();
      if (currentTime - this.lastTime > this.inactivityThreshold) {
        // If the difference is more than your set threshold, refresh the event list
        this.store$.dispatch(enmEventsActions.enmEventListRequest())
      }
    }
  }

}
