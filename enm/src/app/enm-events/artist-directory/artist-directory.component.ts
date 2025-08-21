import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import * as ArtistDirectoryActions from './../../state/artistDirectory/artistDirectory.actions';
import * as ArtistDirectorySelectors from './../../state/artistDirectory/artistDirectory.selectors';
import * as AuthSelectors from './../../state/auth/auth.selectors';
import { combineLatest } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';


@Component({
  selector: 'app-artist-directory',
  templateUrl: './artist-directory.component.html',
  styleUrls: ['./artist-directory.component.less']
})
export class ArtistDirectoryComponent {

  artists$ = this.store$.select(ArtistDirectorySelectors.sortFiltered)
  count$ = this.store$.select(ArtistDirectorySelectors.selectFilteredArtistDirectoryCount)
  totalCount$ = this.store$.select(ArtistDirectorySelectors.selectAllCount)
  counts$ = combineLatest({
    filtered: this.count$,
    total: this.totalCount$
  });


  recentlyTouredArtists$ = this.store$.select(ArtistDirectorySelectors.sortFilteredNonRGV)
  showRecentlyTouredArtistsOnly$ = this.store$.select(ArtistDirectorySelectors.selectRecentlyToured);
  countRecentlyTouredArtists$ = this.store$.select(ArtistDirectorySelectors.selectFilteredArtistDirectoryCountForRecentlyTouredArtists)
  totalCountRecentlyTouredArtists$ = this.store$.select(ArtistDirectorySelectors.selectAllNonRGVCount)

  nonRGVCounts$ = combineLatest({
    filtered: this.countRecentlyTouredArtists$,
    total: this.totalCountRecentlyTouredArtists$
  });
  
  filter$ = this.store$.select(ArtistDirectorySelectors.selectFilter) // for giving user feedback when filter doesn't return results
  loading$ = this.store$.select(ArtistDirectorySelectors.selectLoading)

  user$ = this.store$.select(AuthSelectors.selectUser); // for distinguishing between regular and plus users

  constructor(private store$: Store<AppState>) {}

  ngOnInit() {
    this.store$.dispatch(ArtistDirectoryActions.artistDirectoryRequest());
  }

  getArtistCreatedDate(artist: Artist): string {
  if (!artist?._id) return '';

  // Extract ObjectId timestamp (first 8 hex chars)
  const timestamp = parseInt(artist._id.substring(0, 8), 16) * 1000;

  // Convert to a human-readable date string
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

}
