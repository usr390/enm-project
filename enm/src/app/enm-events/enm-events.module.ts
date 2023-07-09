import { CommonModule } from '@angular/common';
import { EnmEventListComponent } from './enm-event-list/enm-event-list.component';
import { EnmEventPageComponent } from './enm-event-page/enm-event-page.component';
import { EnmEventListFilterComponent } from './enm-event-list-filter/enm-event-list-filter.component';
import { EnmEventListToolbarComponent } from './enm-event-list-toolbar/enm-event-list-toolbar.component';
import { EnmEventAddModule } from './enm-event-add/enm-event-add.module';
import { EnmEventRoutingModule } from './enm-events-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { EnmEventTimeComponent } from './enm-event-add/enm-event-time/enm-event-time.component';
import { EnmEventPriceOfEntryComponent } from './enm-event-add/enm-event-price-of-entry/enm-event-price-of-entry.component';
import { EnmEventArtistsComponent } from './enm-event-add/enm-event-artists/enm-event-artists.component';



@NgModule({
  declarations: [
    EnmEventListComponent,
    EnmEventPageComponent,
    EnmEventListFilterComponent,
    EnmEventListToolbarComponent,
    EnmEventTimeComponent,
    EnmEventPriceOfEntryComponent,
    EnmEventArtistsComponent,
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
    EnmEventPriceOfEntryComponent,
    EnmEventArtistsComponent,
  ]
})
export class EnmEventModule { }
