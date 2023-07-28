// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// enm imports
import { WordifiedDateKeyPipe } from './../pipes/wordified-date-key.pipe';
import { WordifiedPriceOfEntryPipe } from './wordified-price-of-entry.pipe';
import { DateTimeToWordifiedMonthPipe } from './../pipes/date-time-to-wordified-month.pipe';
import { DateTimeToDayPipe } from './../pipes/date-time-to-day.pipe';
import { DateTimeToTimePipe } from '../pipes/date-time-to-time.pipe';
import { LogoComponent } from './logo/logo.component';

// primeng imports
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';



@NgModule({
  declarations: [
    WordifiedDateKeyPipe,
    WordifiedPriceOfEntryPipe,
    DateTimeToWordifiedMonthPipe,
    DateTimeToDayPipe,
    DateTimeToTimePipe,
    LogoComponent
  ],
  imports: [
    CommonModule,
    // primeng modules
    AvatarModule,
    AvatarGroupModule
  ],
  exports: [
    WordifiedDateKeyPipe,
    WordifiedPriceOfEntryPipe,
    DateTimeToWordifiedMonthPipe,
    DateTimeToDayPipe,
    DateTimeToTimePipe,
    LogoComponent
  ],
})
export class SharedModule { }
