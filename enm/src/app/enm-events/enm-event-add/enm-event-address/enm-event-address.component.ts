import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';

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
    this.addressForm.setControl('eventLocation', this.fb.control('', Validators.required));
    this.addressForm.setControl('address', this.fb.control('', Validators.required));
    this.addressForm.setControl('city', this.fb.control('', Validators.required));
    this.addressForm.setControl('state', this.fb.control('', Validators.required));
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.router.navigate(['/add-event/date']);
    }
  }

  cancelForm() { 
    this.addressForm.removeControl('eventLocation');
    this.addressForm.removeControl('address');
    this.addressForm.removeControl('city');
    this.addressForm.removeControl('state');
    this.router.navigate(['/']);
  }
}
