import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateTimeToWordifiedMonth'
})
export class DateTimeToWordifiedMonthPipe implements PipeTransform {

  transform(dt: string) {
    return DateTime.fromISO(dt).toFormat('LLL');
  }

}
