import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'standardTime'
})
export class StandardTimePipe implements PipeTransform {

  transform(startTime: number): string {

    // transform operates on military time, so return on invalid startTime values 
    if (startTime < 0 || startTime > 2359) return '';
    
    // parse startTime into variables
    const hour = Math.floor(startTime / 100);
    const minute = startTime % 100;
    const ampm = hour < 12 ? 'am' : 'pm';

    // convert military hour to standard hour
    let standardHour = hour % 12; if (standardHour === 0) standardHour = 12;

    // format with colon separator and am/pm indicator. then return
    return `${standardHour}:${minute.toString().padStart(2, '0')}${ampm}`;;
  }
}
