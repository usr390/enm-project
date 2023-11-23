// angular imports
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// enm imports
import { EnmEventListComponent } from './enm-event-list/enm-event-list.component';
import { EnmEventPageComponent } from './enm-event-page/enm-event-page.component';
import { EnmEventListFilterComponent } from './enm-event-list-filter/enm-event-list-filter.component';
import { EnmEventListToolbarComponent } from './enm-event-list-toolbar/enm-event-list-toolbar.component';
import { EnmEventRoutingModule } from './enm-events-routing.module';
import { EnmPlusPaymentScreenComponent } from './enm-plus-payment-screen/enm-plus-payment-screen.component';
import { EnmPlusPaymentSuccessfulComponent } from './enm-plus-payment-successful/enm-plus-payment-successful.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    EnmEventListComponent,
    EnmEventListFilterComponent,
    EnmEventListToolbarComponent,
    EnmEventPageComponent,
    EnmPlusPaymentScreenComponent,
    EnmPlusPaymentSuccessfulComponent,
  ],
  imports: [
    // angular modules
    CommonModule,
    ReactiveFormsModule,
    // enm modules
    EnmEventRoutingModule,
    CoreModule,
    SharedModule,
  ],
  exports: []
})
export class EnmEventModule { }
