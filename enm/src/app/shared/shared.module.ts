// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// enm imports
import { WordifiedDateKeyPipe } from './../pipes/wordified-date-key.pipe';
import { WordifiedCoverPipe } from '../pipes/wordified-cover.pipe';
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
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DataViewModule } from 'primeng/dataview';
import { ArtistNamesPipe } from '../pipes/artist-names.pipe';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
  declarations: [
    // enm imports
    WordifiedDateKeyPipe,
    WordifiedCoverPipe,
    DateTimeToWordifiedMonthPipe,
    DateTimeToDayPipe,
    DateTimeToTimePipe,
    LogoComponent,
    ArtistNamesPipe,
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
    ScrollPanelModule,
    PasswordModule,
    InputMaskModule,
    ToastModule,
    CardModule,
    ProgressSpinnerModule,
    DataViewModule,
    FieldsetModule
  ],
  exports: [
    // enm imports
    WordifiedDateKeyPipe,
    WordifiedCoverPipe,
    DateTimeToWordifiedMonthPipe,
    DateTimeToDayPipe,
    DateTimeToTimePipe,
    ArtistNamesPipe,
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
    ScrollPanelModule,
    PasswordModule,
    InputMaskModule,
    ToastModule,
    CardModule,
    ProgressSpinnerModule,
    DataViewModule,
    FieldsetModule
  ],
  providers: [
    // primeng providers
    MessageService
  ]
})
export class SharedModule { }
