import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EnmEventService } from './../../core/services/enm-event.service';
import { Store } from '@ngrx/store';
import * as fromEnmEvents from './../../state/enmEvents/enmEvents.actions'

@Component({
  selector: 'app-enm-event-list-filter',
  templateUrl: './enm-event-list-filter.component.html',
  styleUrls: ['./enm-event-list-filter.component.less']
})
export class EnmEventListFilterComponent implements OnInit {

  enmEventListFilterForm = this.fb.group({ filter: '' });

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private store$: Store, private enmEventService: EnmEventService, private fb: FormBuilder) { }

  ngOnInit() {}

  filterResults() { 
    let text = this.enmEventListFilterForm.value.filter?.trim() as string
    this.store$.dispatch(fromEnmEvents.enmEventListSearch({ text }))
    this.enmEventService.updateEnmEventListFilter(this.enmEventListFilterForm.value.filter?.trim() as string); 
  }

  clearFilter() {
    this.enmEventListFilterForm.patchValue({ filter: ''});
    this.filterResults();
    this.searchInput.nativeElement.focus();
  }
}

