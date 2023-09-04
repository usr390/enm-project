// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// enm imports
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    SidebarComponent,
    LoginComponent,
  ],
  imports: [
    // angular modules
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    // enm modules,
    SharedModule,
  ],
  exports: [
    SidebarComponent,
    LoginComponent
  ]
})
export class CoreModule { }
