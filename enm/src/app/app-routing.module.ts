// angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// enm imports
import { LogInComponent } from './core/login/login.component';
import { CreateUserComponent } from './core/create-user/create-user.component';
import { EnmPlusPaymentScreenComponent } from './enm-events/enm-plus-payment-screen/enm-plus-payment-screen.component';
import { EnmPlusPaymentSuccessfulComponent } from './enm-events/enm-plus-payment-successful/enm-plus-payment-successful.component';
import { EnmEventPageComponent } from './enm-events/enm-event-page/enm-event-page.component';
import { EnmEventListComponent } from './enm-events/enm-event-list/enm-event-list.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { TermsOfServiceComponent } from './shared/terms-of-service/terms-of-service.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'events' },
  { path: 'events', component: EnmEventListComponent },
  { path: 'events/:id', component: EnmEventPageComponent },
  { path: 'login', component: LogInComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'plus', component: EnmPlusPaymentScreenComponent },
  { path: 'checkout/return', component: EnmPlusPaymentSuccessfulComponent },
  { path: 'add-event', loadChildren: () => import('./enm-events/enm-event-add/enm-event-add.module').then(m => m.EnmEventAddModule) },
  { path: 'termsofservice', component: TermsOfServiceComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
