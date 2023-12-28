import { Component } from '@angular/core'; // angular
import { Store, select } from '@ngrx/store'; // 3rd party
import * as AuthSelectors from './../../state/auth/auth.selectors'; // enm
import * as RouterSelectors from './../../state/router/router.selectors'; // enm
import { AppState } from 'src/app/state/app.state';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-enm-event-list-toolbar',
  templateUrl: './enm-event-list-toolbar.component.html',
  styleUrls: ['./enm-event-list-toolbar.component.less']
})
export class EnmEventListToolbarComponent {

  showToolbar$ = this.store$.select(RouterSelectors.selectUrl).pipe(
    map(url => url && (url.startsWith('/events') || url.startsWith('/termsofservice') || url.startsWith('/privacypolicy')))
  );
  
  

  constructor(private store$: Store<AppState>){}

  user$ = this.store$.select(AuthSelectors.selectUser);
  currentRoute$ = this.store$.select(RouterSelectors.selectUrl).pipe(tap((route) => console.log('route: ', route)))

}
