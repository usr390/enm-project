// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// enm imports
import { SharedModule } from '../shared/shared.module';
import { LogInComponent } from './logIn/logIn.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    SidebarComponent,
    LogInComponent,
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
    LogInComponent
  ]
})
export class CoreModule { }
