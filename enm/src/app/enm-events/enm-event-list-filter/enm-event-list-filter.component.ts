import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromEnmEvents from './../../state/enmEvents/enmEvents.actions'

@Component({
  selector: 'app-enm-event-list-filter',
  templateUrl: './enm-event-list-filter.component.html',
  styleUrls: ['./enm-event-list-filter.component.less']
})
export class EnmEventListFilterComponent {

  enmEventListFilterForm = this.fb.group({ filter: '' });

  constructor(private store$: Store, private fb: FormBuilder) { }

  filterResults() { 
    let text = this.enmEventListFilterForm.value.filter?.trim() as string
    this.store$.dispatch(fromEnmEvents.enmEventListFilter({ text }))
  }

  clearFilter() {
    this.enmEventListFilterForm.patchValue({ filter: ''});
    this.filterResults();
  }
}

