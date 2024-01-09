import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordifiedCover'
})
export class WordifiedCoverPipe implements PipeTransform {

  transform(cover: number | null): string {
    if (cover === null || cover === undefined) return '';
    if (cover === 0) return 'No Cover'; else return `$${cover.toString()}`;
  }

}
