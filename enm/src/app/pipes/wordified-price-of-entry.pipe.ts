import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordifiedPriceOfEntry'
})
export class WordifiedPriceOfEntryPipe implements PipeTransform {

  transform(priceOfEntry: number): string {
    if (priceOfEntry === 0) return 'No Cover'; else return `$${priceOfEntry.toString()}`;
  }

}
