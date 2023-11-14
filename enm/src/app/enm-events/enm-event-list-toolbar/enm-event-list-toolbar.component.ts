import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthSelectors from './../../state/auth/auth.selectors';

@Component({
  selector: 'app-enm-event-list-toolbar',
  templateUrl: './enm-event-list-toolbar.component.html',
  styleUrls: ['./enm-event-list-toolbar.component.less']
})
export class EnmEventListToolbarComponent {

  user$ = this.store$.select(AuthSelectors.selectUser);

  constructor(private store$: Store){}

}
