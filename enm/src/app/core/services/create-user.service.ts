import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(private fb: FormBuilder) { }

  public userLogInForm: FormGroup = this.fb.group({});


}
