import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EnmEventListComponent } from "./enm-event-list/enm-event-list.component";
import { EnmEventPageComponent } from "./enm-event-page/enm-event-page.component";
import { EnmPlusPaymentScreenComponent } from "./enm-plus-payment-screen/enm-plus-payment-screen.component";

const routes: Routes = [
  { path: 'add-event', loadChildren: () => import('./enm-event-add/enm-event-add.module').then(m => m.EnmEventAddModule) },
  { path: 'plus', component: EnmPlusPaymentScreenComponent },
  { path: ':id', component: EnmEventPageComponent },
  { path: '', component: EnmEventListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnmEventRoutingModule { }

