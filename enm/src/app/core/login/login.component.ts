import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  constructor(private loginService: LoginService, private fb: FormBuilder) {}

  userLoginForm: FormGroup = this.loginService.userLoginForm;

  ngOnInit() {
    this.setUpLocalFormControls();
  }
  
  onSubmit() {
    this.loginService.postLogin();
  }

  //#region utility
  setUpLocalFormControls() {
    this.userLoginForm.setControl('username', this.fb.control('', Validators.required));
    this.userLoginForm.setControl('password', this.fb.control('', Validators.required));
  }
  //#endregion
}
