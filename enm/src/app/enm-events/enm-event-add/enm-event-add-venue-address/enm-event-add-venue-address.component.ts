// angular imports
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// enm imports
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';

@Component({
  selector: 'app-enm-event-add-venue-address',
  templateUrl: './enm-event-add-venue-address.component.html',
  styleUrls: ['./enm-event-add-venue-address.component.less']
})
export class EnmEventAddVenueAddressComponent {

  constructor(
    // angular
    private router: Router,
    private fb: FormBuilder,
    // enm
    private enmEventAddMultipageFormService: EnmEventAddMultipageFormService
  ){}

  enmEventAddVenueForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddVenueForm;
  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;

  ngOnInit() {
    this.setUpLocalFormControls();
  }

  onSubmit() {
    if (this.enmEventAddVenueForm.valid) { 
      this.enmEventAddMultipageFormService.postVenue();
      this.syncEnmEventAddForm();
      this.router.navigate(['/add-event/date']) 
    } 
  }

  goBack() { 
    this.tearDownLocalFormControls();
    this.router.navigate(['/add-event/add-venue-city']); 
  }

  cancelForm() { 
    this.tearDownExistingFormControls();
    this.router.navigate(['/']); 
  }

  //#region utility
  setUpLocalFormControls(){
    this.enmEventAddVenueForm.setControl('address', this.fb.control('', Validators.required));
  }
  tearDownLocalFormControls() {
    this.enmEventAddVenueForm.removeControl('address');
  }
  tearDownExistingFormControls() {
    this.enmEventAddForm.removeControl('venue');
    this.enmEventAddForm.removeControl('tags');
    this.enmEventAddVenueForm.removeControl('city');
    this.enmEventAddVenueForm.removeControl('address');
  }
  syncEnmEventAddForm() {
    /* summary
      with requisite information for the new venue now captured, the main form will sync w it
    */ 
    this.enmEventAddForm.setControl('venue', this.fb.group({
      name: this.fb.control(this.enmEventAddVenueForm.get('name')?.value, [Validators.required]),
      address: this.fb.control(this.enmEventAddVenueForm.get('address')?.value, [Validators.required]),
      city: this.fb.control(this.enmEventAddVenueForm.get('city')?.value, [Validators.required]),
      state: this.fb.control('Texas', [Validators.required]),
      country: this.fb.control('USA', [Validators.required])
    }));
  }
  //#endregion
}
