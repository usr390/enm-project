import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { ArtistDirectoryService } from 'src/app/core/services/artist-directory.service';

@Component({
  selector: 'app-artist-directory',
  templateUrl: './artist-directory.component.html',
  styleUrls: ['./artist-directory.component.less']
})
export class ArtistDirectoryComponent {

  artists$ = this.artistDirectoryService.getArtistDirectory().pipe(tap(value => console.log(value)))

  constructor(private artistDirectoryService: ArtistDirectoryService) {}

}
