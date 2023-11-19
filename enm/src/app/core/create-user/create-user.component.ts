import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AuthActions from './../../state/auth/auth.actions'
import { CreateUserService } from '../services/create-user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less']
})
export class CreateUserComponent {

  constructor(private store$: Store, private fb: FormBuilder, private createUserService: CreateUserService, private elRef: ElementRef, private renderer: Renderer2, ) {}

  createUserForm: FormGroup = this.createUserService.userLogInForm;
  logInButtonCooldown = false;

  ngOnInit() {
    this.setUpLocalFormControls();
  }

  ngAfterViewInit() {
    this.autoFocus();
  }
  
  onSubmit() {
    if (this.createUserForm.valid){
      const credentials = {
        username: this.createUserForm.get('username')?.value.trim(),
        password: this.createUserForm.get('password')?.value.trim(),
      }
      this.store$.dispatch(AuthActions.createUserRequest({ credentials }))
    } 
  }

  //#region utility
  setUpLocalFormControls() {
    this.createUserForm.setControl('username', this.fb.control('', [Validators.required, Validators.maxLength(20)]));
    this.createUserForm.setControl('password', this.fb.control('', [Validators.required, Validators.maxLength(20)]));
  }

  autoFocus() {
    setTimeout(() => {
      const element = this.elRef.nativeElement.querySelector('input');
      this.renderer.selectRootElement(element).focus();
    }, 50);
  }
  //#endregion

}
