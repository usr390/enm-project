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
import { EnmEventCoverComponent } from './enm-event-cover/enm-event-cover.component';
import { EnmEventArtistsComponent } from './enm-event-artists/enm-event-artists.component';
import { SharedModule } from './../../shared/shared.module';
import { EnmEventAddVenueCityComponent } from './enm-event-add-venue-city/enm-event-add-venue-city.component';
import { EnmEventAddVenueAddressComponent } from './enm-event-add-venue-address/enm-event-add-venue-address.component';
import { EnmEventPromoterComponent } from './enm-event-promoter/enm-event-promoter.component';

@NgModule({
  declarations: [
    EnmEventVenueComponent,
    EnmEventDateComponent,
    EnmEventTimeComponent,
    EnmEventCoverComponent,
    EnmEventArtistsComponent,
    EnmEventAddVenueCityComponent,
    EnmEventAddVenueAddressComponent,
    EnmEventPromoterComponent,
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
