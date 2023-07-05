// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AutoCompleteModule } from 'primeng/autocomplete';

// enm imports
import { EnmEventAddRoutingModule } from './enm-event-add-routing.module';
import { EnmEventAddressComponent } from './enm-event-address/enm-event-address.component';
import { EnmEventDateComponent } from './enm-event-date/enm-event-date.component';


@NgModule({
  declarations: [
    EnmEventAddressComponent,
    EnmEventDateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    EnmEventAddRoutingModule,
    AutoCompleteModule
  ],
  exports: [
    EnmEventAddressComponent,
    EnmEventDateComponent
  ]
})
export class EnmEventAddModule { }
