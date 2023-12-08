import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateTimeToWordifiedMonthFull'
})
export class DateTimeToWordifiedMonthFullPipe implements PipeTransform {

  transform(dt: string | null) {
    return DateTime.fromISO(dt!).toFormat('LLLL');
  }

}
