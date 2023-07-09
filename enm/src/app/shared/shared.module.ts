// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// enm imports
import { StandardTimePipe } from './../pipes/standard-time.pipe';
import { WordifiedMonthPipe } from './../pipes/wordified-month.pipe';
import { WordifiedDateKeyPipe } from './../pipes/wordified-date-key.pipe';
import { WordifiedPriceOfEntryPipe } from './wordified-price-of-entry.pipe';
import { DateTimeToWordifiedMonthPipe } from '../src/app/date-time-to-wordified-month.pipe';



@NgModule({
  declarations: [
    StandardTimePipe,
    WordifiedMonthPipe,
    WordifiedDateKeyPipe,
    WordifiedPriceOfEntryPipe,
    DateTimeToWordifiedMonthPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StandardTimePipe,
    WordifiedMonthPipe,
    WordifiedDateKeyPipe,
    WordifiedPriceOfEntryPipe,
    DateTimeToWordifiedMonthPipe
  ],
})
export class SharedModule { }
