import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EnmEventAddMultipageFormService } from '../../../core/services/enm-event-add-multipage-form.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-enm-event-venue',
  templateUrl: './enm-event-venue.component.html',
  styleUrls: ['./enm-event-venue.component.less']
})
export class EnmEventVenueComponent {
  /* summary
    adds venue information to an event.
    cancel: EnmEventListComponent, next: EnmEventDateComponent || EnmEventAddVenueCityComponent
  */

  venues: any[] | undefined;
  filteredVenues!: any[];
  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;
  enmEventAddVenueForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddVenueForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initializeVenueAutoCompleteSuggestions();
    this.setUpLocalFormControls();
  }

  onSubmit() { 
    if (this.enmEventAddForm.valid) {
      this.addTags(); 
      this.navigateToNextFormComponent();
    } 
  }

  goBack() { 
    this.tearDownExistingFormControls();
    this.router.navigate(['/']); 
  }

  cancelForm() { 
    this.tearDownExistingFormControls();
    this.router.navigate(['/']); 
  }

  //#region utility
  setUpLocalFormControls() {
    this.enmEventAddForm.setControl('venue', this.fb.control('', Validators.required));
    this.enmEventAddForm.setControl('tags', this.fb.array([]));
  }
  tearDownExistingFormControls() {
    this.enmEventAddForm.removeControl('venue');
    this.enmEventAddForm.removeControl('tags');
  }
  addTags() {
    const tagsArray = this.enmEventAddForm.get('tags') as FormArray;
    const userVenue = this.enmEventAddForm.get('venue')?.value;
    const autoCompleteSuggestion = 'object';

    if (typeof userVenue === autoCompleteSuggestion) {
      const venueName = this.enmEventAddForm.get('venue')?.value.name;
      const cityName = this.enmEventAddForm.get('venue')?.value.city;
      tagsArray.push(this.fb.control(venueName));
      tagsArray.push(this.fb.control(cityName));
    } 
    else tagsArray.push(this.fb.control(userVenue));
  }
  initializeVenueAutoCompleteSuggestions() {
    this.enmEventAddMultipageFormService.getVenues().then((venues) => { this.venues = venues; });
  }
  filterVenue(event: AutoCompleteCompleteEvent){
    let filtered: any[] = [];
    let query = event.query;
    
    for (let i = 0; i < (this.venues as any[]).length; i++) {
      let venue = (this.venues as any[])[i];
      if (venue.name.toLowerCase().indexOf(query.toLowerCase()) != -1) filtered.push(venue); 
    }

    this.filteredVenues = filtered;
  }
  navigateToNextFormComponent() {
    /* summary
      the basis of this function is an assumption on PrimeNG's default autocomplete behavior: values from the suggestion list are Objects
      if, then, the form control's value is not an Object it means the user did not select from the suggestions list and is thus attempting to enter a venue not yet in our system
      in which case the user is navigated to an "offshoot" form to collect more data about the venue
    */
    const userVenue = this.enmEventAddForm.get('venue')?.value;
    const autoCompleteSuggestion = 'object'
    if (typeof userVenue === autoCompleteSuggestion) {
      this.router.navigate(['/add-event/date']); 
    } 
    else {
      this.enmEventAddVenueForm.setControl('name', this.fb.control(userVenue));
      this.router.navigate([ 'add-event/add-venue-city' ]);
    }
  }
  //#endregion

}
