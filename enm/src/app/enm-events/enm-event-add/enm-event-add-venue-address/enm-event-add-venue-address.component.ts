import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';

@Component({
  selector: 'app-enm-event-add-venue-address',
  templateUrl: './enm-event-add-venue-address.component.html',
  styleUrls: ['./enm-event-add-venue-address.component.less']
})
export class EnmEventAddVenueAddressComponent {

  enmEventAddVenueForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddVenueForm;
  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private router: Router, private fb: FormBuilder){}

  ngOnInit() {
    this.enmEventAddVenueForm.setControl('address', this.fb.control('', Validators.required));
  }

  onSubmit() {
    if (this.enmEventAddVenueForm.valid) { 
      this.enmEventAddMultipageFormService.postVenue();
      this.enmEventAddForm.setControl('venue', this.fb.group({
        name: this.fb.control(this.enmEventAddVenueForm.get('name')?.value, [Validators.required]),
        address: this.fb.control(this.enmEventAddVenueForm.get('address')?.value, [Validators.required]),
        city: this.fb.control(this.enmEventAddVenueForm.get('city')?.value, [Validators.required]),
        state: this.fb.control('Texas', [Validators.required]),
        country: this.fb.control('USA', [Validators.required])
      }));
      this.router.navigate(['/add-event/date']) 
    } 
  }

  goBack() { 
    this.enmEventAddVenueForm.removeControl('address');
    this.router.navigate(['/add-event/add-venue-name']); 
  }

  cancelForm() { 
    this.enmEventAddVenueForm.removeControl('address');
    this.router.navigate(['/']); 
  }
  
}
