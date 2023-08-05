import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EnmEventAddMultipageFormService } from './../../../core/services/enm-event-add-multipage-form.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

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

  venues: any[] | undefined;
  filteredVenues!: any[];
  addressForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.enmEventAddMultipageFormService.getVenues().then((venues) => { this.venues = venues; });
    this.addressForm.setControl('location', this.fb.control('', Validators.required));
    this.addressForm.setControl('address', this.fb.control('', Validators.required));
    this.addressForm.setControl('city', this.fb.control('', Validators.required));
    this.addressForm.setControl('state', this.fb.control('', Validators.required));
    this.addressForm.setControl('test', this.fb.control('', Validators.required));
  }

  onSubmit() { if (this.addressForm.valid) { this.router.navigate(['/add-event/date']); } }

  cancelForm() { this.router.navigate(['/']); }

  filterVenue(event: AutoCompleteCompleteEvent){
    let filtered: any[] = [];
    let query = event.query;
    
    for (let i = 0; i < (this.venues as any[]).length; i++) {
      let venue = (this.venues as any[])[i];
      if (venue.name.toLowerCase().indexOf(query.toLowerCase()) == 0) filtered.push(venue); 
    }

    this.filteredVenues = filtered;
  }
}
