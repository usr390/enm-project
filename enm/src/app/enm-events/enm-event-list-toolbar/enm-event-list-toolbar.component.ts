import { Component } from '@angular/core'; // angular
import { Store } from '@ngrx/store'; // 3rd party
import * as AuthSelectors from './../../state/auth/auth.selectors'; // enm

@Component({
  selector: 'app-enm-event-list-toolbar',
  templateUrl: './enm-event-list-toolbar.component.html',
  styleUrls: ['./enm-event-list-toolbar.component.less']
})
export class EnmEventListToolbarComponent {

  constructor(private store$: Store){}

  user$ = this.store$.select(AuthSelectors.selectUser);

}
