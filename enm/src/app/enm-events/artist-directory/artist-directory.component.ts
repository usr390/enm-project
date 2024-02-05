import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { ArtistDirectoryService } from 'src/app/core/services/artist-directory.service';
import { AppState } from 'src/app/state/app.state';

import * as ArtistDirectoryActions from './../../state/artistDirectory/artistDirectory.actions';


@Component({
  selector: 'app-artist-directory',
  templateUrl: './artist-directory.component.html',
  styleUrls: ['./artist-directory.component.less']
})
export class ArtistDirectoryComponent {

  artists$ = this.artistDirectoryService.getArtistDirectory().pipe(tap(value => console.log(value)))

  constructor(private artistDirectoryService: ArtistDirectoryService, private store$: Store<AppState>) {}

  ngOnInit() {
    this.store$.dispatch(ArtistDirectoryActions.artistDirectoryRequest());
  }

}
