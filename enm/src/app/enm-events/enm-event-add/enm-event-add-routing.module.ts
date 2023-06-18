import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnmEventAddressComponent } from './enm-event-address/enm-event-address.component';
import { EnmEventDateComponent } from './enm-event-date/enm-event-date.component';
import { EnmEventTimeComponent } from './enm-event-time/enm-event-time.component';
import { EnmEventPriceOfEntryComponent } from './enm-event-price-of-entry/enm-event-price-of-entry.component';
import { EnmEventArtistsComponent } from './enm-event-artists/enm-event-artists.component';

const routes: Routes = [
  { path: 'address', component: EnmEventAddressComponent },
  { path: 'date', component: EnmEventDateComponent },
  { path: 'time', component: EnmEventTimeComponent },
  { path: 'price', component: EnmEventPriceOfEntryComponent },
  { path: 'artists', component: EnmEventArtistsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnmEventAddRoutingModule { }
