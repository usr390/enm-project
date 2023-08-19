import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnmEventVenueComponent } from './enm-event-venue/enm-event-venue.component';
import { EnmEventDateComponent } from './enm-event-date/enm-event-date.component';
import { EnmEventTimeComponent } from './enm-event-time/enm-event-time.component';
import { EnmEventPriceOfEntryComponent } from './enm-event-price-of-entry/enm-event-price-of-entry.component';
import { EnmEventArtistsComponent } from './enm-event-artists/enm-event-artists.component';
import { EnmEventAddVenueNameComponent } from './enm-event-add-venue-name/enm-event-add-venue-name.component';
import { EnmEventAddVenueCityComponent } from './enm-event-add-venue-city/enm-event-add-venue-city.component';

const routes: Routes = [
  { path: 'venue', component: EnmEventVenueComponent },
  { path: 'date', component: EnmEventDateComponent },
  { path: 'time', component: EnmEventTimeComponent },
  { path: 'price', component: EnmEventPriceOfEntryComponent },
  { path: 'artists', component: EnmEventArtistsComponent },
  { path: 'add-venue-name', component: EnmEventAddVenueNameComponent },
  { path: 'add-venue-city', component: EnmEventAddVenueCityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnmEventAddRoutingModule { }
