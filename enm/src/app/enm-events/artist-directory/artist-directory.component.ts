import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import * as ArtistDirectoryActions from './../../state/artistDirectory/artistDirectory.actions';
import * as ArtistDirectorySelectors from './../../state/artistDirectory/artistDirectory.selectors';
import * as AuthSelectors from './../../state/auth/auth.selectors';


@Component({
  selector: 'app-artist-directory',
  templateUrl: './artist-directory.component.html',
  styleUrls: ['./artist-directory.component.less']
})
export class ArtistDirectoryComponent {

  artists$ = this.store$.select(ArtistDirectorySelectors.sortFiltered)
  count$ = this.store$.select(ArtistDirectorySelectors.selectFilteredArtistDirectoryCount)

  recentlyTouredArtists$ = this.store$.select(ArtistDirectorySelectors.selectFilteredRecentlyTouredArtists)
  countRecentlyTouredArtists$ = this.store$.select(ArtistDirectorySelectors.selectFilteredArtistDirectoryCountForRecentlyTouredArtists)
  
  filter$ = this.store$.select(ArtistDirectorySelectors.selectFilter) // for giving user feedback when filter doesn't return results
  loading$ = this.store$.select(ArtistDirectorySelectors.selectLoading)
  recentlyListedToggle$ = this.store$.select(ArtistDirectorySelectors.selectFilter)

  user$ = this.store$.select(AuthSelectors.selectUser); // for distinguishing between regular and plus users

  constructor(private store$: Store<AppState>) {}

  ngOnInit() {
    this.store$.dispatch(ArtistDirectoryActions.artistDirectoryRequest());
  }

}
