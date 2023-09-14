import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from './../../state/auth/auth.actions';
import * as fromAuth from './../../state/auth/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  constructor(private loginService: LoginService, private fb: FormBuilder, private store: Store) {}

  logInErrorResponse$ = this.store.select(fromAuth.selectLogInErrorResponse);

  userLoginForm: FormGroup = this.loginService.userLoginForm;

  ngOnInit() {
    this.setUpLocalFormControls();
  }
  
  onSubmit() {
    if (this.userLoginForm.valid){
      const credentials = {
        username: this.userLoginForm.get('username')?.value,
        password: this.userLoginForm.get('password')?.value,
      }
      this.store.dispatch(AuthActions.logInRequest({ credentials }))
    } 
  }

  //#region utility
  setUpLocalFormControls() {
    this.userLoginForm.setControl('username', this.fb.control('', Validators.required));
    this.userLoginForm.setControl('password', this.fb.control('', Validators.required));
  }
  //#endregion
}
