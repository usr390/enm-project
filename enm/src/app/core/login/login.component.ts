// angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementRef, Renderer2 } from '@angular/core';
// 3rd party
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { MessageService } from 'primeng/api';
// enm
import { LogInService } from '../services/login.service';
import { AppState } from 'src/app/state/app.state';
import * as AuthActions from '../../state/auth/auth.actions';
import * as AuthSelectors from '../../state/auth/auth.selectors';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LogInComponent {
  
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private logInService: LogInService,
    private fb: FormBuilder,
    private store$: Store<AppState>,
    private messageService: MessageService
  ) {}

  userLogInForm: FormGroup = this.logInService.userLogInForm;
  logInButtonCooldown = false;
  logInProcessing$ = this.store$.select(AuthSelectors.logInProcessing); // for displaying animation on 'Log In' button


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
      this.store$.dispatch(AuthActions.logInRequest({ credentials }))
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
