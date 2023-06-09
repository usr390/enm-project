import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enm-event-address',
  templateUrl: './enm-event-address.component.html',
  styleUrls: ['./enm-event-address.component.less']
})
export class EnmEventAddressComponent {
  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.addressForm = this.formBuilder.group({
      eventLocation: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      // do something with the form values here
      // for example, store the form values for later use.
      console.log(this.addressForm.value);
      this.router.navigate(['/add-event/date']);
    }
  }

  cancelForm() { this.router.navigate(['/']); }
}
