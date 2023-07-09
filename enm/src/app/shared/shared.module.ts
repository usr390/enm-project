// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// enm imports
import { StandardTimePipe } from './../pipes/standard-time.pipe';
import { WordifiedMonthPipe } from './../pipes/wordified-month.pipe';
import { WordifiedDateKeyPipe } from './../pipes/wordified-date-key.pipe';
import { WordifiedPriceOfEntryPipe } from './wordified-price-of-entry.pipe';
import { DateTimeToWordifiedMonthPipe } from './../pipes/date-time-to-wordified-month.pipe';
import { DateTimeToDayPipe } from './../pipes/date-time-to-day.pipe';



@NgModule({
  declarations: [
    StandardTimePipe,
    WordifiedMonthPipe,
    WordifiedDateKeyPipe,
    WordifiedPriceOfEntryPipe,
    DateTimeToWordifiedMonthPipe,
    DateTimeToDayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StandardTimePipe,
    WordifiedMonthPipe,
    WordifiedDateKeyPipe,
    WordifiedPriceOfEntryPipe,
    DateTimeToWordifiedMonthPipe,
    DateTimeToDayPipe
  ],
})
export class SharedModule { }
