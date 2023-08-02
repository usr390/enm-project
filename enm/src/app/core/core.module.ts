import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent } from './sidebar/sidebar.component';

// enm imports
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // enm modules,
    SharedModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class CoreModule { }
