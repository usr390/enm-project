import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import * as fromAuth from './../../state/auth/auth.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  currentDate = new Date();

  user$ = this.store.select(fromAuth.selectUser);

  constructor(private store: Store<fromAuth.State>) {}
}
