import { Component } from '@angular/core';
import { LogInService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from './../../state/auth/auth.actions';
import * as fromAuth from './../../state/auth/auth.reducer';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LogInComponent {
  constructor(private logInService: LogInService, private fb: FormBuilder, private store: Store, private messageService: MessageService) {}

  logInErrorResponse$ = this.store.select(fromAuth.selectLogInErrorResponse).pipe(
    map(error => this.showInvalidCredentialsAlert(error?.error.error))
  );

  userLogInForm: FormGroup = this.logInService.userLogInForm;
  logInButtonCooldown = false;

  ngOnInit() {
    this.setUpLocalFormControls();
  }
  
  onSubmit() {
    if (this.userLogInForm.valid){
      this.applyLogInButtonCooldown();
      const credentials = {
        username: this.userLogInForm.get('username')?.value.trim(),
        password: this.userLogInForm.get('password')?.value.trim(),
      }
      this.store.dispatch(AuthActions.logInRequest({ credentials }))
    } 
  }

  //#region utility
  setUpLocalFormControls() {
    this.userLogInForm.setControl('username', this.fb.control('', Validators.required));
    this.userLogInForm.setControl('password', this.fb.control('', Validators.required));
  }
  showInvalidCredentialsAlert(error: string | undefined) {
    this.messageService.add({ severity: 'error', summary: error, detail: 'Please try again' });
  }
  applyLogInButtonCooldown() {
    this.logInButtonCooldown = true;
    setTimeout(() => {
      this.logInButtonCooldown = false;
    }, 2000); 
  }
  //#endregion
}
