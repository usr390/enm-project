import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateTimeToDay'
})
export class DateTimeToDayPipe implements PipeTransform {

  transform(dt: string) {
    return DateTime.fromISO(dt).toFormat('d');
  }

}
