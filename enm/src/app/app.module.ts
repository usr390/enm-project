// angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// enm imports
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { EnmEventModule } from './enm-events/enm-events.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    EnmEventModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
