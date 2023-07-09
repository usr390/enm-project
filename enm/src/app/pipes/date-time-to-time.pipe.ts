import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateTimeToTime'
})
export class DateTimeToTimePipe implements PipeTransform {

  transform(dt: string) {
    let timeString = DateTime.fromISO(dt).toFormat('t');;
    return timeString.replace('AM', 'am').replace('PM', 'pm').replace(' ', '');
  }

}
