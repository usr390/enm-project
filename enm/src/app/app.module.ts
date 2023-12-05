// angular module imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// enm imports
import { CoreModule } from './core/core.module';
import { EnmEventModule } from './enm-events/enm-events.module';
import { SharedModule } from './shared/shared.module';

// 3rd party imports
import { EffectsModule } from '@ngrx/effects';
  // written by enm team but related to parent
  import { AuthEffects } from './state/auth/auth.effects';
  import { EnmEventsEffects } from './state/enmEvents/enmEvents.effects';
  import { HydrationEffects } from './state/hydration/hydration.effects';
  import { PaymentEffects } from './state/payment/payment.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store';
  // written by enm team but related to parent
  import { reducers, metaReducers } from './state/app.state';
import { StoreRouterConnectingModule, RouterState } from "@ngrx/router-store";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //#region angular modules
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    //#endregion 
    //#region enm modules
    CoreModule,
    EnmEventModule,
    SharedModule,
    //#endregion
    //#region 3rd party modules
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([ 
      AuthEffects, 
      PaymentEffects,
      EnmEventsEffects,
      HydrationEffects
    ]),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal }),
    //#endregion
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
