import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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

  @ViewChild('containerRef') container!: ElementRef;
  ngAfterViewInit() {
    this.centerElement();
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.centerElement();
  }
  centerElement() {
    const containerElement = this.container.nativeElement;
    const topPosition = (window.innerHeight - containerElement.offsetHeight) / 2;
    containerElement.style.position = 'relative';
    containerElement.style.top = `${topPosition}px`;
  }

  venues: any[] | undefined;
  filteredVenues!: any[];
  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.enmEventAddMultipageFormService.getVenues().then((venues) => { this.venues = venues; });
    this.enmEventAddForm.setControl('venue', this.fb.control('', Validators.required));
    this.enmEventAddForm.setControl('tags', this.fb.array([]));
  }

  onSubmit() { if (this.enmEventAddForm.valid) { this.addTags(); this.router.navigate(['/add-event/date']); } }

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

  // utility
  addTags() {
    const tagsArray = this.enmEventAddForm.get('tags') as FormArray;
    const venueName = this.enmEventAddForm.get('venue')?.value.name;
    if (venueName) tagsArray.push(this.fb.control(venueName));
  }
}
