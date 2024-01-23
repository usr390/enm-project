// angular imports
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// 3rd party imports
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, take } from 'rxjs';
// enm imports
import { AppState } from 'src/app/state/app.state';
import * as fromEnmEvents from './../../state/enmEvents/enmEvents.actions'
import * as EnmEventsSelectors from './../../state/enmEvents/enmEvents.selectors';
import * as AuthSelectors from './../../state/auth/auth.selectors';


@Component({
  selector: 'app-enm-event-list-filter',
  templateUrl: './enm-event-list-filter.component.html',
  styleUrls: ['./enm-event-list-filter.component.less']
})
export class EnmEventListFilterComponent {

  constructor(
    private fb: FormBuilder, // angular
    private store$: Store<AppState>, // 3rd party
  ) { }

  enmEventListFilterForm = this.fb.group({ filter: '', checked: false });
  selectedFilterText$ = this.store$.select(EnmEventsSelectors.selectedFilterText); // for repopulating the input field after a refresh or navigation
  filter="Just Listed"
  currentUser$ = this.store$.select(AuthSelectors.selectUser);
  gifted = "merwin"
  filter$ = this.store$.select(EnmEventsSelectors.selectFilter);

  ngOnInit() {
    this.initializeFormControl();
    this.enmEventListFilterForm.valueChanges.pipe(
      debounceTime(100), // Adjust the debounce time as needed
      distinctUntilChanged(),
    )
    .subscribe(values => {
      this.filterResults();
    });

  }

  filterResults() { 
    let text = this.enmEventListFilterForm.value.filter?.trim() as string
    let recentlyListed = this.enmEventListFilterForm.value.checked as boolean
    this.store$.dispatch(fromEnmEvents.enmEventListFilter({ text, recentlyListed }))
  }

  clearFilter() {
    this.enmEventListFilterForm.patchValue({ filter: ''});
    this.filterResults();
  }

  initializeFormControl() {
    this.selectedFilterText$.pipe(take(1)).subscribe(filterText => {
      this.enmEventListFilterForm.get('filter')?.setValue(filterText)
    });
    // Assuming you have a selector like `selectToggleState`
    this.store$.select(EnmEventsSelectors.selectFilter).pipe(take(1)).subscribe(filter => {
      this.enmEventListFilterForm.get('checked')?.setValue(filter.recentlyListed);
    });

  }
}

