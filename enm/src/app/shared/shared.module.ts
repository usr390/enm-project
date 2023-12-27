// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// enm imports
import { WordifiedDateKeyPipe } from './../pipes/wordified-date-key.pipe';
import { WordifiedCoverPipe } from '../pipes/wordified-cover.pipe';
import { DateTimeToWordifiedMonthPipe } from './../pipes/date-time-to-wordified-month.pipe';
import { DateTimeToWordifiedMonthFullPipe } from '../pipes/date-time-to-wordified-month-full.pipe';
import { DateTimeToDayPipe } from './../pipes/date-time-to-day.pipe';
import { DateTimeToTimePipe } from '../pipes/date-time-to-time.pipe';
import { ArtistNamesPipe } from '../pipes/artist-names.pipe';
import { LogoComponent } from './logo/logo.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

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
import { DividerModule } from 'primeng/divider';
import { ScrollTopModule } from 'primeng/scrolltop';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [
    // enm imports
    WordifiedDateKeyPipe,
    WordifiedCoverPipe,
    DateTimeToWordifiedMonthPipe,
    DateTimeToWordifiedMonthFullPipe,
    DateTimeToDayPipe,
    DateTimeToTimePipe,
    LogoComponent,
    ArtistNamesPipe,
    TermsOfServiceComponent,
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
    DividerModule,
    ScrollTopModule,
    PanelModule,
  ],
  exports: [
    // enm imports
    WordifiedDateKeyPipe,
    WordifiedCoverPipe,
    DateTimeToWordifiedMonthPipe,
    DateTimeToDayPipe,
    DateTimeToTimePipe,
    ArtistNamesPipe,
    DateTimeToWordifiedMonthFullPipe,
    LogoComponent,
    TermsOfServiceComponent,
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
    DividerModule,
    ScrollTopModule,
    PanelModule,
  ],
  providers: [
    // primeng providers
    MessageService
  ]
})
export class SharedModule { }
