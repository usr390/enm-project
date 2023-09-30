import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../state/auth/auth.reducer';
import * as AuthActions from '../../state/auth/auth.actions';



@Injectable({
  providedIn: 'root'
})
export class StatePersistenceService {

  /* summary
    persists NgRx store's state in browser's local storage
      - allows users to refresh page without losing session
      - allows users to leave web app and come back without losing session
  */

  constructor(private store: Store<fromAuth.State>) { }

  persistToBrowserLocalStorage(auth: any) {
    localStorage.setItem('auth', JSON.stringify(auth))
  }

  rehydrateBrowserFromLocalStorage() {
    const localStorageAsString = localStorage.getItem('auth');
    if (localStorageAsString) {
      const auth: fromAuth.State = JSON.parse(localStorageAsString);
      this.store.dispatch(AuthActions.rehydrateFromBrowserLocalStorage(auth));
    }
  }
}
