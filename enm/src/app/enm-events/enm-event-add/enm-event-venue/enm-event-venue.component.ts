import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
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
    cancel: EnmEventListComponent, next: EnmEventDateComponent
  */

  venues: any[] | undefined;
  filteredVenues!: any[];
  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;
  enmEventAddVenueForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddVenueForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.enmEventAddMultipageFormService.getVenues().then((venues) => { this.venues = venues; });
    this.setUpLocalControls();
  }

  onSubmit() { 
    if (this.enmEventAddForm.valid) this.navigateUser();
  }

  cancelForm() { 
    this.tearDownExistingControls();
    this.router.navigate(['/']); 
  }

  //#region utility
  setUpLocalControls() {
    this.enmEventAddForm.setControl('venue', this.fb.control('', Validators.required));
    this.enmEventAddForm.setControl('tags', this.fb.array([]));
  }
  tearDownExistingControls() {
    this.enmEventAddForm.removeControl('venue');
    this.enmEventAddForm.removeControl('tags');
  }
  addTags() {
    const tagsArray = this.enmEventAddForm.get('tags') as FormArray;
    const venueName = this.enmEventAddForm.get('venue')?.value.name;
    const cityName = this.enmEventAddForm.get('venue')?.value.city;
    if (venueName) {
      tagsArray.push(this.fb.control(venueName));
      tagsArray.push(this.fb.control(cityName));
    }
  }

  addTagsNewVenue() {
    // new venues will not have city info readily available so must not be pushed into tags array yet (unlike in 'addTags()' which operates when a venue is selected from list of autocomplete suggestions)
    const tagsArray = this.enmEventAddForm.get('tags') as FormArray;
    const venueName = this.enmEventAddForm.get('venue')?.value;
    if (venueName) {
      tagsArray.push(this.fb.control(venueName));
    }
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

  navigateUser() {
    /* summary
      the basis of this function is an assumption on PrimeNG's default autocomplete behavior: values from the suggestion list are Objects
      if, then, the form control's value is a string it means the user did not select from the suggestions list and is thus attempting to enter a venue not yet in our system
      in this case, the user will be navigated to an "offshoot" form to collect more data about the venue
    */
    const userVenue = this.enmEventAddForm.get('venue')?.value;
    const notFromAutoCompleteSuggestions = 'string'
    if (typeof userVenue === notFromAutoCompleteSuggestions) {
      this.addTagsNewVenue();
      this.enmEventAddVenueForm.setControl('name', this.fb.control(userVenue));
      this.router.navigate([ 'add-event/add-venue-city' ]);
    } 
    else {
      this.addTags(); 
      this.router.navigate(['/add-event/date']); 
    }
  }
  //#endregion

}
