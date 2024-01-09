import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'doorTimeToTime'
})
export class DoorTimeToTimePipe implements PipeTransform {

  transform(doors: string) {
    let timeString = DateTime.fromISO(doors).toFormat('t');
    console.log(timeString);
    return timeString.replace('AM', '').replace('PM', '').replace(' ', '');
  }

}
