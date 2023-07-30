// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// primeng imports
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

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
    // primeng modules
    AutoCompleteModule,
    ButtonModule,
    InputTextModule
  ],
  exports: [
    EnmEventAddressComponent,
    EnmEventDateComponent
  ]
})
export class EnmEventAddModule { }
