// angular imports
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// 3rd party imports
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, take, tap } from 'rxjs';
// enm imports
import { AppState } from 'src/app/state/app.state';
import * as fromEnmEvents from './../../state/enmEvents/enmEvents.actions'
import * as ArtistDirectoryActions from './../../state/artistDirectory/artistDirectory.actions'
import * as ArtistDirectorySelectors from './../../state/artistDirectory/artistDirectory.selectors'
import * as EnmEventsSelectors from './../../state/enmEvents/enmEvents.selectors';
import * as AuthSelectors from './../../state/auth/auth.selectors';
import * as RouterSelectors from './../../state/router/router.selectors'; // enm



@Component({
  selector: 'app-enm-event-list-filter',
  templateUrl: './enm-event-list-filter.component.html',
  styleUrls: ['./enm-event-list-filter.component.less']
})
export class EnmEventListFilterComponent {

  genres: string[] = [];

  constructor(
    private fb: FormBuilder, // angular
    private store$: Store<AppState>, // 3rd party
  ) { }

  showEnmEventFilter$ = this.store$.select(RouterSelectors.selectUrl).pipe(
    map(url => url && (url.startsWith('/events')))
  );

  showArtistFilter$ = this.store$.select(RouterSelectors.selectUrl).pipe(
    map(url => url && (url.startsWith('/artist-directory') || url.startsWith('/iBhLq5wrrxafte4a')) )
  );

  enmEventListFilterForm = this.fb.group({ filter: '', checked: false, touring: false });
  artistDirectoryFilterForm = this.fb.group({ filter: '', recentlyListed: false, rock: false, punk: false, metal: false, edm: false, perreo: false, techno: false, rap: false, rnb: false, jazz: false, pop: false, experimental: false, latin: false, other: false });
  selectedFilterText$ = this.store$.select(EnmEventsSelectors.selectedFilterText); // for repopulating the input field after a refresh or navigation
  selectedArtistDirectoryFilterText$ = this.store$.select(ArtistDirectorySelectors.selectFilterText); // for repopulating the input field after a refresh or navigation
  filter="Just Listed"
  touring="Touring"
  currentUser$ = this.store$.select(AuthSelectors.selectUser);
  gifted = "merwin"
  filter$ = this.store$.select(EnmEventsSelectors.selectFilter);

  ngOnInit() {
    this.genres = ['rock', 'punk', 'metal', 'edm', 'perreo', 'techno', 'rap', 'rnb', 'jazz', 'pop', 'experimental', 'latin', 'other'];
    this.initializeFormControl();
    this.initializeArtistDirectoryFormControl()
    this.enmEventListFilterForm.valueChanges.pipe(
      debounceTime(100), // Adjust the debounce time as needed
      distinctUntilChanged(),
    )
    .subscribe(values => {
      this.filterResults();
    });

    this.artistDirectoryFilterForm.valueChanges.pipe(
      debounceTime(100), // Adjust the debounce time as needed
      distinctUntilChanged(),
    )
    .subscribe(values => {
      this.filterArtistDirectoryResults();
    });


  }

  filterResults() { 
    let text = this.enmEventListFilterForm.value.filter?.trim() as string
    let recentlyListed = this.enmEventListFilterForm.value.checked as boolean
    let touring = this.enmEventListFilterForm.value.touring as boolean
    this.store$.dispatch(fromEnmEvents.enmEventListFilter({ text, recentlyListed, touring }))
  }

  filterArtistDirectoryResults(){
    let text = this.artistDirectoryFilterForm.value.filter?.trim() as string
    let recentlyListed = this.artistDirectoryFilterForm.value.recentlyListed as boolean
    let rock = this.artistDirectoryFilterForm.value.rock as boolean
    let punk = this.artistDirectoryFilterForm.value.punk as boolean
    let metal = this.artistDirectoryFilterForm.value.metal as boolean
    let edm = this.artistDirectoryFilterForm.value.edm as boolean
    let perreo = this.artistDirectoryFilterForm.value.perreo as boolean
    let techno = this.artistDirectoryFilterForm.value.techno as boolean
    let rap = this.artistDirectoryFilterForm.value.rap as boolean
    let rnb = this.artistDirectoryFilterForm.value.rnb as boolean
    let jazz = this.artistDirectoryFilterForm.value.jazz as boolean
    let pop = this.artistDirectoryFilterForm.value.pop as boolean
    let experimental = this.artistDirectoryFilterForm.value.experimental as boolean
    let latin = this.artistDirectoryFilterForm.value.latin as boolean
    let other = this.artistDirectoryFilterForm.value.other as boolean

    this.store$.dispatch(ArtistDirectoryActions.artistDirectoryFilter({ text, recentlyListed, rock, punk, metal, edm, perreo, techno, rap, rnb, jazz, pop, experimental, latin, other }))
  }

  clearFilter() {
    this.enmEventListFilterForm.patchValue({ filter: ''});
    this.filterResults();
  }

  clearArtistDirectoryFilter() {
    this.artistDirectoryFilterForm.patchValue({ filter: ''});
    this.filterArtistDirectoryResults();
  }

  initializeFormControl() {
    this.selectedFilterText$.pipe(take(1)).subscribe(filterText => {
      this.enmEventListFilterForm.get('filter')?.setValue(filterText)
    });
    // Assuming you have a selector like `selectToggleState`
    this.store$.select(EnmEventsSelectors.selectFilter).pipe(take(1)).subscribe(filter => {
      this.enmEventListFilterForm.get('checked')?.setValue(filter.recentlyListed);
    });
    // Assuming you have a selector like `selectToggleState`
    this.store$.select(EnmEventsSelectors.selectFilter).pipe(take(1)).subscribe(filter => {
      this.enmEventListFilterForm.get('touring')?.setValue(filter.touring);
    });

  }

  initializeArtistDirectoryFormControl() {
    this.selectedArtistDirectoryFilterText$.pipe(take(1)).subscribe(filterText => {
      this.artistDirectoryFilterForm.get('filter')?.setValue(filterText)
    });
  }
}

