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
import { DoorTimeToTimePipe } from './door-time-to-time.pipe';

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
import { FooterComponent } from './footer/footer.component';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { HighlightPipePipe } from './highlight-pipe.pipe';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';
import { ListedHowLongAgoPipe } from './listed-how-long-ago.pipe';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { GenreListPipePipe } from '../genre-list-pipe.pipe';
import { ReverseUpdatesPipe } from './reverse-updates.pipe';
import { LinkifyPipe } from './pipes/linkify.pipe';
import { BlogPreviewPipe } from '../blog-preview.pipe';
import { BlogifyBodyPipe } from '../blogify-body.pipe';
import { TableModule } from 'primeng/table';
import { ArtistIDtoCreationTimePipe } from '../artist-idto-creation-time.pipe';

@NgModule({
  declarations: [
    // enm imports
    WordifiedDateKeyPipe,
    WordifiedCoverPipe,
    DateTimeToWordifiedMonthPipe,
    DateTimeToWordifiedMonthFullPipe,
    DateTimeToDayPipe,
    DateTimeToTimePipe,
    DoorTimeToTimePipe,
    LogoComponent,
    ArtistNamesPipe,
    TermsOfServiceComponent,
    FooterComponent,
    HighlightPipePipe,
    ListedHowLongAgoPipe,
    GenreListPipePipe,
    ReverseUpdatesPipe,
    LinkifyPipe,
    BlogPreviewPipe,
    BlogifyBodyPipe,
    ArtistIDtoCreationTimePipe,
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
    TooltipModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    TagModule,
    CarouselModule,
    OverlayPanelModule,
    TableModule
  ],
  exports: [
    // enm imports
    WordifiedDateKeyPipe,
    WordifiedCoverPipe,
    DateTimeToWordifiedMonthPipe,
    DateTimeToDayPipe,
    DateTimeToTimePipe,
    DoorTimeToTimePipe,
    ArtistNamesPipe,
    DateTimeToWordifiedMonthFullPipe,
    LogoComponent,
    TermsOfServiceComponent,
    HighlightPipePipe,
    GenreListPipePipe,
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
    FooterComponent,
    TooltipModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    TagModule,
    CarouselModule,
    ListedHowLongAgoPipe,
    OverlayPanelModule,
    ReverseUpdatesPipe,
    LinkifyPipe,
    BlogPreviewPipe,
    BlogifyBodyPipe,
    TableModule,
    ArtistIDtoCreationTimePipe
  ],
  providers: [
    // primeng providers
    MessageService,
    ConfirmationService
  ]
})
export class SharedModule { }
