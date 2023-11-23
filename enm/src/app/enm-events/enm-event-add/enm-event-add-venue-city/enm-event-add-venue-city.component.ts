// angular imports
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// enm imports
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';

@Component({
  selector: 'app-enm-event-add-venue-city',
  templateUrl: './enm-event-add-venue-city.component.html',
  styleUrls: ['./enm-event-add-venue-city.component.less']
})
export class EnmEventAddVenueCityComponent {

  constructor(
    // angular
    private fb: FormBuilder,
    private router: Router,
    // enm
    private enmEventAddMultipageFormService: EnmEventAddMultipageFormService,
  ){}

  enmEventAddVenueForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddVenueForm;
  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;

  ngOnInit() {
    this.setUpLocalFormControls();
  }

  onSubmit() { 
    if (this.enmEventAddVenueForm.valid) { 
      this.addTags();
      this.router.navigate(['/add-event/add-venue-address']); 
    } 
  }

  goBack() { 
    this.tearDownLocalFormControls();
    this.router.navigate(['/add-event/venue']);
  }

  cancelForm() { 
    this.tearDownExistingFormControls();
    this.router.navigate(['/']); 
  }

  //#region utility
  setUpLocalFormControls() {
    this.enmEventAddVenueForm.setControl('city', this.fb.control('', Validators.required));
  }
  tearDownLocalFormControls() {
    this.enmEventAddVenueForm.removeControl('city');
  }
  tearDownExistingFormControls() {
    this.enmEventAddForm.removeControl('venue');
    this.enmEventAddForm.removeControl('tags');
    this.enmEventAddVenueForm.removeControl('city');
  }
  addTags() {
    const tagsArray = this.enmEventAddForm.get('tags') as FormArray;
    const cityName = this.enmEventAddVenueForm.get('city')?.value;
    if (cityName) tagsArray.push(this.fb.control(cityName));
  }
  //#endregion
}
