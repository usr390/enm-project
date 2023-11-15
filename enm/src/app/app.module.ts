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
import { AuthEffects } from './state/auth/auth.effects';
import { PaymentEffects } from './state/payment/payment.effects';
import { EnmEventsEffects } from './state/enmEvents/enmEvents.effects';



// 3rd party imports
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state/app.state';

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
    EnmEventModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([ 
      AuthEffects, 
      PaymentEffects,
      EnmEventsEffects
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
