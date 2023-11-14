import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';



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
      this.store.dispatch(AuthActions.rehydrateFromBrowserLocalStorage(auth));
    }
  }
}
