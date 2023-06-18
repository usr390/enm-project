import { CommonModule } from '@angular/common';
import { EnmEventListComponent } from './enm-event-list/enm-event-list.component';
import { EnmEventPageComponent } from './enm-event-page/enm-event-page.component';
import { EnmEventListFilterComponent } from './enm-event-list-filter/enm-event-list-filter.component';
import { EnmEventListToolbarComponent } from './enm-event-list-toolbar/enm-event-list-toolbar.component';
import { EnmEventAddModule } from './enm-event-add/enm-event-add.module';
import { EnmEventRoutingModule } from './enm-events-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EnmEventTimeComponent } from './enm-event-add/enm-event-time/enm-event-time.component';



@NgModule({
  declarations: [
    EnmEventListComponent,
    EnmEventPageComponent,
    EnmEventListFilterComponent,
    EnmEventListToolbarComponent,
    EnmEventTimeComponent,
  ],
  imports: [
    CommonModule,
    EnmEventAddModule,
    EnmEventRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    EnmEventListComponent,
    EnmEventPageComponent,
    EnmEventTimeComponent,
  ]
})
export class EnmEventModule { }
