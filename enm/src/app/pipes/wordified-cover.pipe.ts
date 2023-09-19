import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordifiedCover'
})
export class WordifiedCoverPipe implements PipeTransform {

  transform(cover: number): string {
    if (cover === 0) return 'No Cover'; else return `$${cover.toString()}`;
  }

}
