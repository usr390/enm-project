import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppActions from '../../state/app.actions';
import * as AuthActions from '../../state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';
import { AppState } from 'src/app/state/app.state';



@Injectable({
  providedIn: 'root'
})
export class StatePersistenceService {

  /* summary
    persists NgRx store's state in browser's local storage
      - allows users to refresh page without losing session
      - allows users to leave web app and come back without losing session
  */

  constructor(private store: Store<AuthState>) { }

  persistToBrowserLocalStorage(auth: any) {
    localStorage.setItem('auth', JSON.stringify(auth))
  }

  rehydrateBrowserFromLocalStorage() {
    const localStorageAsString = localStorage.getItem('auth');
    if (localStorageAsString) {
      const auth: AuthState = JSON.parse(localStorageAsString);
      console.log('prerehydrate - authState -> NgRx store: \n', auth)
      this.store.dispatch(AuthActions.rehydrateFromBrowserLocalStorage(auth));
    }
  }

  // persistToBrowserLocalStorageTest(appState: any) {
  //   localStorage.setItem('state', JSON.stringify(appState))
  // }

  // rehydrateBrowserFromLocalStorageTest() {
  //   const localStorageAsString = localStorage.getItem('state');
  //   if (localStorageAsString) {
  //     const appState: AppState = JSON.parse(localStorageAsString);
  //     console.log('prerehydrate - localStorage -> NgRx store: \n', appState)
  //     this.store.dispatch(AppActions.rehydrateFromBrowserLocalStorage({ appState }));
  //   }
  // }
}
