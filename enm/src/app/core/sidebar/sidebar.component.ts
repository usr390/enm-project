import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  currentDate = new Date();
  user = this.loginService.user;

  constructor(private loginService: LoginService) {}
}
