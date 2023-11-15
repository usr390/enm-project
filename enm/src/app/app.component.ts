import { Component } from '@angular/core';
import { StatePersistenceService } from './core/services/state-persistence.service';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { AuthState } from './state/auth/auth.state';
import * as AuthSelectors from './state/auth/auth.selectors';
import * as AppSelectors from './state/app.selectors';
import { AppState } from './state/app.state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'enm';

  store$ = this.store.select(AuthSelectors.selectAuthState).pipe(
    tap(authState => console.log('prepersist authState:', authState)),
    map((authState) => { this.statePersistenceService.persistToBrowserLocalStorage(authState) })
  );

  // store$ = this.store.select(AppSelectors.selectAppState).pipe(
  //   tap(appState => console.log('prepersist appState:', appState)),
  //   distinctUntilChanged(),
  //   map((appState) => { this.statePersistenceService.persistToBrowserLocalStorageTest(appState) })
  // );

  constructor(private statePersistenceService: StatePersistenceService, private store: Store<AuthState>) { }

  ngOnInit() {
    this.statePersistenceService.rehydrateBrowserFromLocalStorage();
    // this.statePersistenceService.rehydrateBrowserFromLocalStorageTest();
  }
}
