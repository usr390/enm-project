import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnmEventAddRoutingModule } from './enm-event-add-routing.module';
import { EnmEventAddressComponent } from './enm-event-address/enm-event-address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EnmEventDateComponent } from './enm-event-date/enm-event-date.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    EnmEventAddressComponent,
    EnmEventDateComponent
  ],
  imports: [
    EnmEventAddRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    EnmEventAddressComponent,
    EnmEventDateComponent
  ]
})
export class EnmEventAddModule { }
