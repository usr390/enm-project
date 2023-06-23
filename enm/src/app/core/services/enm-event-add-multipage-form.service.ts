import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EnmEventAddMultipageFormService {

  public enmEventAddMultipageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.enmEventAddMultipageForm = this.fb.group({});
  }
}
