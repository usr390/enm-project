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

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.enmEventAddMultipageFormService.getVenues().then((venues) => { this.venues = venues; });
    this.enmEventAddForm.setControl('venue', this.fb.control('', Validators.required));
    this.enmEventAddForm.setControl('tags', this.fb.array([]));
  }

  onSubmit() { 
    if (this.enmEventAddForm.valid) { 
      this.addTags(); 
      this.router.navigate(['/add-event/date']); 
    } 
  }

  cancelForm() { 
    this.nullifyExistingControls();
    this.router.navigate(['/']); 
  }

  //#region utility
  nullifyExistingControls() {
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
  filterVenue(event: AutoCompleteCompleteEvent){
    let filtered: any[] = [];
    let query = event.query;
    
    for (let i = 0; i < (this.venues as any[]).length; i++) {
      let venue = (this.venues as any[])[i];
      if (venue.name.toLowerCase().indexOf(query.toLowerCase()) != -1) filtered.push(venue); 
    }

    // if no matches, add a special "Add Venue" button
    if (filtered.length === 0) filtered.push({name: 'Add Venue', isCustomAdd: true});

    this.filteredVenues = filtered;
  }
  addVenue() { 
    this.router.navigate(['/add-event/add-venue-name'])
  }
  //#endregion

}
