import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent } from './sidebar/sidebar.component';

// enm imports
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    SidebarComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // enm modules,
    SharedModule,
  ],
  exports: [
    SidebarComponent,
    LoginComponent
  ]
})
export class CoreModule { }
