import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import * as ArtistDirectoryActions from './../../state/artistDirectory/artistDirectory.actions';
import * as ArtistDirectorySelectors from './../../state/artistDirectory/artistDirectory.selectors';



@Component({
  selector: 'app-artist-directory',
  templateUrl: './artist-directory.component.html',
  styleUrls: ['./artist-directory.component.less']
})
export class ArtistDirectoryComponent {

  artists$ = this.store$.select(ArtistDirectorySelectors.selectAll)

  constructor(private store$: Store<AppState>) {}

  ngOnInit() {
    this.store$.dispatch(ArtistDirectoryActions.artistDirectoryRequest());
  }

}
