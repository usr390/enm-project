import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from './../../state/auth/auth.reducer';

@Component({
  selector: 'app-enm-event-list-toolbar',
  templateUrl: './enm-event-list-toolbar.component.html',
  styleUrls: ['./enm-event-list-toolbar.component.less']
})
export class EnmEventListToolbarComponent {

  user$ = this.store$.select(fromAuth.selectUser);

  constructor(private store$: Store){}

}
