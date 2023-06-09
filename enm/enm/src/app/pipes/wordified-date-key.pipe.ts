import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordifiedDateKey'
})
export class WordifiedDateKeyPipe implements PipeTransform {

  transform(dateKey: string): string {

    // format should be exactly 'yyyymmdd', return empty string if not
    if (dateKey.length !== 8) return '';

    const date = new Date(parseInt(dateKey.slice(0, 4)), parseInt(dateKey.slice(4, 6)) - 1, parseInt(dateKey.slice(6, 8)));
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    return `${daysOfWeek[date.getDay()]}, ${monthsOfYear[date.getMonth()]} ${date.getDate()}`;
  }

}
