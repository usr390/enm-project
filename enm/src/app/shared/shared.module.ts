import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardTimePipe } from '../pipes/standard-time.pipe';
import { WordifiedMonthPipe } from '../pipes/wordified-month.pipe';
import { WordifiedDateKeyPipe } from '../pipes/wordified-date-key.pipe';
import { WordifiedPriceOfEntryPipe } from './wordified-price-of-entry.pipe';



@NgModule({
  declarations: [
    StandardTimePipe,
    WordifiedMonthPipe,
    WordifiedDateKeyPipe,
    WordifiedPriceOfEntryPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StandardTimePipe,
    WordifiedMonthPipe,
    WordifiedDateKeyPipe,
    WordifiedPriceOfEntryPipe
  ],
})
export class SharedModule { }
