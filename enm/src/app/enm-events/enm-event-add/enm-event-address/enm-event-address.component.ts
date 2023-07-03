import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EnmEventAddMultipageFormService } from './../../../core/services/enm-event-add-multipage-form.service';

@Component({
  selector: 'app-enm-event-address',
  templateUrl: './enm-event-address.component.html',
  styleUrls: ['./enm-event-address.component.less']
})
export class EnmEventAddressComponent {
  /* summary
    adds location information to an event.
    cancel: EnmEventListComponent, next: EnmEventAddDateComponent
  */
 
  addressForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.addressForm.setControl('location', this.fb.control('', Validators.required));
    this.addressForm.setControl('address', this.fb.control('', Validators.required));
    this.addressForm.setControl('city', this.fb.control('', Validators.required));
    this.addressForm.setControl('state', this.fb.control('', Validators.required));
  }

  onSubmit() { if (this.addressForm.valid) { this.router.navigate(['/add-event/date']); } }

  cancelForm() { this.router.navigate(['/']); }
}
