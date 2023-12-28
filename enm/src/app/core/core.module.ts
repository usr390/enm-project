// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// enm imports
import { SharedModule } from '../shared/shared.module';
import { LogInComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [
    // enm components
    SidebarComponent,
    LogInComponent,
    CreateUserComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
  ],
  imports: [
    // angular modules
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    // enm modules,
    SharedModule,
  ],
  exports: [
    // enm components
    SidebarComponent,
    LogInComponent,
    CreateUserComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent
  ]
})
export class CoreModule { }
