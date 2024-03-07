import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AuthSelectors from './../../state/auth/auth.selectors';
import * as AuthActions from './../../state/auth/auth.actions'
import { CreateUserService } from '../services/create-user.service';
import { AppState } from 'src/app/state/app.state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less']
})
export class CreateUserComponent {

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private createUserService: CreateUserService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute // Inject ActivatedRoute here
  ) {}

  createUserButtonCooldown = false
  createUserForm: FormGroup = this.createUserService.createUserForm;
  createUserProcessing$ = this.store$.select(AuthSelectors.createUserProcessing); // for displaying animation on 'create user' button


  ngOnInit() {
    this.setUpLocalFormControls();
    this.checkForPromoCode();
  }

  ngAfterViewInit() {
    this.autoFocus();
  }
  
  onSubmit() {
    if (this.createUserForm.valid){
      this.applycreateUserButtonCooldown();
      const credentials = {
        username: this.createUserForm.get('username')?.value.trim(),
        password: this.createUserForm.get('password')?.value.trim(),
        promoCode: this.createUserForm.get('promoCode')?.value
      }
      this.store$.dispatch(AuthActions.createUserRequest({ credentials }))
    } 
  }

  //#region utility
  setUpLocalFormControls() {
    this.createUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      promoCode: ['65c89dd3411ee8f8']
    });
  }
  applycreateUserButtonCooldown() {
    this.createUserButtonCooldown = true;
    setTimeout(() => {
      this.createUserButtonCooldown = false;
    }, 2000); 
  }
  autoFocus() {
    setTimeout(() => {
      const element = this.elRef.nativeElement.querySelector('input');
      this.renderer.selectRootElement(element).focus();
    }, 50);
  }
  checkForPromoCode() {
    // Subscribe to query params to extract 'promoCode', if any
    this.route.queryParams.subscribe(params => {
      const promoCode = params['promoCode'] || ''; // Default to an empty string if not present
      this.createUserForm.get('promoCode')?.setValue(promoCode);
    });
  }
  //#endregion

}
