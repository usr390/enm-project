import { Component } from '@angular/core';
import { StatePersistenceService } from './core/services/state-persistence.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import * as fromAuth from './state/auth/auth.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'enm';

  store$ = this.store.select(fromAuth.selectAuthState).pipe(
    map((authState) => { this.statePersistenceService.persistToBrowserLocalStorage(authState) })
  );

  constructor(private statePersistenceService: StatePersistenceService, private store: Store<fromAuth.AuthState>) { }

  ngOnInit() {
    this.statePersistenceService.rehydrateBrowserFromLocalStorage();
  }
}
