import { Pipe, PipeTransform } from '@angular/core';
import { Artist } from '../models/artist.model';

@Pipe({
  name: 'artistNames'
})
export class ArtistNamesPipe implements PipeTransform {

  transform(artists: Artist[]): string {
    return artists.map(artist => artist.name).join(', ');
  }

}
