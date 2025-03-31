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

  user$ = this.store$.select(AuthSelectors.selectUser); // for distinguishing between regular and plus users

  showEnmEventFilter$ = this.store$.select(RouterSelectors.selectUrl).pipe(
    map(url => url && (url.startsWith('/events')))
  );

  showArtistFilter$ = this.store$.select(RouterSelectors.selectUrl).pipe(
    map(url => url && (url.startsWith('/artist-directory') || url.startsWith('/iBhLq5wrrxafte4a')) )
  );

  enmEventListFilterForm = this.fb.group({ filter: '', checked: false, touring: false });
  artistDirectoryFilterForm = this.fb.group({ filter: '', recentlyListed: false, sortByYearDescending: false, recentlyToured: false, randomArtist: false, Rock: false, Punk: false, Metal: false, EDM: false, Rap: false, Jazz: false, Pop: false, Experimental: false, Latin: false, Other: false });
  selectedFilterText$ = this.store$.select(EnmEventsSelectors.selectedFilterText); // for repopulating the input field after a refresh or navigation
  selectedArtistDirectoryFilterText$ = this.store$.select(ArtistDirectorySelectors.selectFilter); // for repopulating the input field after a refresh or navigation
  filter="Just Listed"
  touring="Touring"
  currentUser$ = this.store$.select(AuthSelectors.selectUser);
  gifted = "merwin"
  filter$ = this.store$.select(EnmEventsSelectors.selectFilter);

  toggleItems: any[] = [
    {
      controlName: 'sortByYearDescending',
      onLabel: 'Timeline',
      offLabel: 'Timeline',
      onIcon: 'pi pi-arrows-v',  // or your chosen icon
      offIcon: 'pi pi-arrows-v'
    },
    {
      controlName: 'recentlyToured',
      onLabel: 'Recently Toured',
      offLabel: 'Recently Toured',
      onIcon: 'fa-solid fa-van-shuttle',
      offIcon: 'fa-solid fa-van-shuttle'
    },
    {
      controlName: 'randomArtist',
      onLabel: 'Random Artist',
      offLabel: 'Random Artist',
      onIcon: 'fa-solid fa-shuffle', // or if you prefer FontAwesome, adjust accordingly
      offIcon: 'fa-solid fa-shuffle'
    }
  ];

  ngOnInit() {
    this.genres = ['Rock', 'Punk', 'Metal', 'Experimental', 'EDM', 'Rap', 'Jazz', 'Pop', 'Latin', 'Other'];
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
    let sortByYearDescending = this.artistDirectoryFilterForm.value.sortByYearDescending as boolean
    let recentlyToured = this.artistDirectoryFilterForm.value.recentlyToured as boolean
    let randomArtist = this.artistDirectoryFilterForm.value.randomArtist as boolean
    let rock = this.artistDirectoryFilterForm.value.Rock as boolean
    let punk = this.artistDirectoryFilterForm.value.Punk as boolean
    let metal = this.artistDirectoryFilterForm.value.Metal as boolean
    let edm = this.artistDirectoryFilterForm.value.EDM as boolean
    let rap = this.artistDirectoryFilterForm.value.Rap as boolean
    let jazz = this.artistDirectoryFilterForm.value.Jazz as boolean
    let pop = this.artistDirectoryFilterForm.value.Pop as boolean
    let experimental = this.artistDirectoryFilterForm.value.Experimental as boolean
    let latin = this.artistDirectoryFilterForm.value.Latin as boolean
    let other = this.artistDirectoryFilterForm.value.Other as boolean

    this.store$.dispatch(ArtistDirectoryActions.artistDirectoryFilter({ text, recentlyListed, sortByYearDescending, recentlyToured, randomArtist, rock, punk, metal, edm, rap, jazz, pop, experimental, latin, other }))
  }

  clearFilter() {
    this.enmEventListFilterForm.patchValue({ filter: ''});
    this.filterResults();
  }

  clearArtistDirectoryFilter() {
    this.artistDirectoryFilterForm.patchValue({ filter: '' });
    
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
    this.selectedArtistDirectoryFilterText$.pipe(take(1)).subscribe(filter => {
      this.artistDirectoryFilterForm.get('filter')?.setValue(filter.text)
      this.artistDirectoryFilterForm.get('sortByYearDescending')?.setValue(filter.sortByYearDescending)
      this.artistDirectoryFilterForm.get('randomArtist')?.setValue(filter.randomArtist)
      this.artistDirectoryFilterForm.get('Rock')?.setValue(filter.rock)
      this.artistDirectoryFilterForm.get('Punk')?.setValue(filter.punk)
      this.artistDirectoryFilterForm.get('Metal')?.setValue(filter.metal)
      this.artistDirectoryFilterForm.get('Experimental')?.setValue(filter.experimental)
      this.artistDirectoryFilterForm.get('EDM')?.setValue(filter.edm)
      this.artistDirectoryFilterForm.get('Rap')?.setValue(filter.rap)
      this.artistDirectoryFilterForm.get('Jazz')?.setValue(filter.jazz)
      this.artistDirectoryFilterForm.get('Pop')?.setValue(filter.pop)
      this.artistDirectoryFilterForm.get('Latin')?.setValue(filter.latin)
      this.artistDirectoryFilterForm.get('Other')?.setValue(filter.other)
    });
  }

  clearGenreFilters() {
    this.genres.forEach(genre => {
      this.artistDirectoryFilterForm.get(genre)?.setValue(false);
    });
    this.artistDirectoryFilterForm.patchValue({ filter: '', recentlyListed: false, sortByYearDescending: false, recentlyToured: false, Rock: false, Punk: false, Metal: false, EDM: false, Rap: false, Jazz: false, Pop: false, Experimental: false, Latin: false, Other: false });
    this.filterArtistDirectoryResults();
  }
  anyGenreSelected(): boolean {
    return this.genres.some(genre => this.artistDirectoryFilterForm.get(genre)?.value) || this.artistDirectoryFilterForm.controls.recentlyToured.value as boolean || this.artistDirectoryFilterForm.controls.sortByYearDescending.value as boolean;
  }
}

