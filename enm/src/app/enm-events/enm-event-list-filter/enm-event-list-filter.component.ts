// angular imports
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// 3rd party imports
import { Store } from '@ngrx/store';
// enm imports
import * as fromEnmEvents from './../../state/enmEvents/enmEvents.actions'

@Component({
  selector: 'app-enm-event-list-filter',
  templateUrl: './enm-event-list-filter.component.html',
  styleUrls: ['./enm-event-list-filter.component.less']
})
export class EnmEventListFilterComponent {

  constructor(
    private fb: FormBuilder, // angular
    private store$: Store, // 3rd party
  ) { }

  enmEventListFilterForm = this.fb.group({ filter: '' });

  filterResults() { 
    let text = this.enmEventListFilterForm.value.filter?.trim() as string
    this.store$.dispatch(fromEnmEvents.enmEventListFilter({ text }))
  }

  clearFilter() {
    this.enmEventListFilterForm.patchValue({ filter: ''});
    this.filterResults();
  }
}

