import { Component } from '@angular/core';
import { LogInService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions';
import * as AuthSelectors from '../../state/auth/auth.selectors';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';

import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LogInComponent {
  constructor(private elRef: ElementRef, private renderer: Renderer2, private logInService: LogInService, private fb: FormBuilder, private store: Store, private messageService: MessageService) {}

  logInErrorResponse$ = this.store.select(AuthSelectors.selectLogInErrorResponse).pipe(
    map(error => this.showInvalidCredentialsAlert(error?.error.error))
  );

  userLogInForm: FormGroup = this.logInService.userLogInForm;
  logInButtonCooldown = false;

  ngOnInit() {
    this.setUpLocalFormControls();
  }

  ngAfterViewInit() {
    this.autoFocus();
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
    this.userLogInForm.setControl('username', this.fb.control('', [Validators.required, Validators.maxLength(20)]));
    this.userLogInForm.setControl('password', this.fb.control('', [Validators.required, Validators.maxLength(20)]));
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
  autoFocus() {
    setTimeout(() => {
      const element = this.elRef.nativeElement.querySelector('input');
      this.renderer.selectRootElement(element).focus();
    }, 50);
  }
  //#endregion
}
