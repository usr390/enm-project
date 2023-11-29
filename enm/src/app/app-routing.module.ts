// angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// enm imports
import { LogInComponent } from './core/login/login.component';
import { CreateUserComponent } from './core/create-user/create-user.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: '', loadChildren: () => import('./enm-events/enm-events.module').then(m => m.EnmEventModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
