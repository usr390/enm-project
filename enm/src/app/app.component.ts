import { Component } from '@angular/core';
import { StatePersistenceService } from './core/services/state-persistence.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthState } from './state/auth/auth.state';
import * as AuthSelectors from './state/auth/auth.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'enm';

  store$ = this.store.select(AuthSelectors.selectAuthState).pipe(
    map((authState) => { this.statePersistenceService.persistToBrowserLocalStorage(authState) })
  );

  constructor(private statePersistenceService: StatePersistenceService, private store: Store<AuthState>) { }

  ngOnInit() {
    this.statePersistenceService.rehydrateBrowserFromLocalStorage();
  }
}
