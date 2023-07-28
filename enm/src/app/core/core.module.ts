import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent } from './sidebar/sidebar.component';

// primeng imports
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // primeng modules
    SidebarModule,
    ButtonModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class CoreModule { }
