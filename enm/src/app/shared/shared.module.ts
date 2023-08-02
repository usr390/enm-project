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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';



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
    // primeng imports
    AvatarModule,
    AvatarGroupModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    SidebarModule,
    ToolbarModule,
  ],
  exports: [
    WordifiedDateKeyPipe,
    WordifiedPriceOfEntryPipe,
    DateTimeToWordifiedMonthPipe,
    DateTimeToDayPipe,
    DateTimeToTimePipe,
    LogoComponent,
    // primeng exports
    AvatarModule,
    AvatarGroupModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    SidebarModule,
    ToolbarModule,
  ],
})
export class SharedModule { }
