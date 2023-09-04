import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent } from './sidebar/sidebar.component';

import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    // enm modules,
    SharedModule,
  ],
  exports: [
    SidebarComponent,
    LoginComponent
  ]
})
export class CoreModule { }
