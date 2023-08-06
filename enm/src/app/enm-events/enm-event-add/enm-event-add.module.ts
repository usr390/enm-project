// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// enm imports
import { EnmEventAddRoutingModule } from './enm-event-add-routing.module';
import { EnmEventVenueComponent } from './enm-event-venue/enm-event-venue.component';
import { EnmEventDateComponent } from './enm-event-date/enm-event-date.component';
import { EnmEventTimeComponent } from './enm-event-time/enm-event-time.component';
import { EnmEventPriceOfEntryComponent } from './enm-event-price-of-entry/enm-event-price-of-entry.component';
import { EnmEventArtistsComponent } from './enm-event-artists/enm-event-artists.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [
    EnmEventVenueComponent,
    EnmEventDateComponent,
    EnmEventTimeComponent,
    EnmEventPriceOfEntryComponent,
    EnmEventArtistsComponent,
  ],
  imports: [
    // angular modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // enm modules
    EnmEventAddRoutingModule,
    SharedModule
  ],
  exports: []
})
export class EnmEventAddModule { }
