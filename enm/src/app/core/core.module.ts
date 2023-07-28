import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent } from './sidebar/sidebar.component';

// enm imports
import { SharedModule } from '../shared/shared.module';

// primeng imports
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // enm modules,
    SharedModule,

    // primeng modules
    SidebarModule,
    ButtonModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class CoreModule { }
