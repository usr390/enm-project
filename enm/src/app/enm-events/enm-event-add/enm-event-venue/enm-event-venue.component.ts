// angular
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// 3rd party
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
// enm
import { EnmEventAddMultipageFormService } from '../../../core/services/enm-event-add-multipage-form.service';
import * as FormActions from '../../../state/form/form.actions';
import * as fromForm from './../../../state/form/form.reducer';

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

  constructor(
    private fb: FormBuilder, // angular
    private router: Router, // angular
    private store$: Store, // 3rd party
    private enmEventAddMultipageFormService: EnmEventAddMultipageFormService // enm
  ) {}

  venues: any[] | undefined; // holds autocomplete suggestions, just for initialization
  filteredVenues!: any[]; // holds autocomplete suggestions with respect to what the user has typed
  selectedVenue$ = this.store$.select(fromForm.selectVenue); // for repopulating the input field after navigating away and back from component

  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;
  enmEventAddFormValuesActionStream$ = this.enmEventAddMultipageFormService.enmEventAddMultipageForm.valueChanges.pipe(
    tap(value => { this.store$.dispatch(FormActions.updateForm({ formValue: value })) }),
  );
  enmEventAddVenueForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddVenueForm;

  ngOnInit() {
    this.initializeVenueAutoCompleteSuggestions();
    this.setUpLocalFormControls();
    this.initializeFormControls();
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

    if (typeof userVenue === autoCompleteSuggestion && userVenue._id) {
        // it's an existing venue thus have all the info needed (address, city, etc). go directly to EEPromoterComp
      this.router.navigate(['/add-event/promoter']); 
    } 
    else if (userVenue.name){
        // mm, user gave us a venue we're not familiar with. better to ask them for more info. go to EEAddVenueCityComp instead
      this.enmEventAddVenueForm.setControl('name', this.fb.control(userVenue.name));
      this.enmEventAddForm.get('venue')?.setValue(userVenue.name);
      this.router.navigate([ 'add-event/add-venue-city' ]);
    }
    else {
        // mm, user gave us a venue we're not familiar with. better to ask them for more info. go to EEAddVenueCityComp instead
        // remark: in a sense this is a primer case (see 'priming read'). essentially does the same as above case, but needed due to some PrimeNG autocomplete weirdness
      this.enmEventAddVenueForm.setControl('name', this.fb.control(userVenue));
      this.router.navigate([ 'add-event/add-venue-city' ]);
    }
  }
  initializeFormControls() {
    this.selectedVenue$.pipe(take(1)).subscribe(venue => {
      if (venue?.country) { 
        // the ref to 'country' is arbitrary. using it as a flag. non-null implies an existing venue is emitted from NgRx store
        this.enmEventAddForm.get('venue')?.setValue(venue)
      }
      else if (venue) {
        // okay, it's not an existing venue, but it is emitted from NgRx regardless and is important to set in case the user navigates back.
        // remark: wrapping in an object so its compatible with PrimeNG's autocomplete component (values must be objects)
        let someVenue = venue as unknown as string
        this.enmEventAddForm.get('venue')?.setValue({ name: someVenue });
      }
      else {
        // do nothing, no venue was stored in NgRx Store. essentially means it's the user's first time on the component
      }

      // remark: an 'existing' venue is one that exists in the backend as a MongoDB document (i.e., a venue we know for a fact exists in the real world). 
      // these are typed 'Venue' in the frontend
      
    });
  }
  //#endregion
}
