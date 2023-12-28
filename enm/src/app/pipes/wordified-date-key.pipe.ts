import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordifiedDateKey'
})
export class WordifiedDateKeyPipe implements PipeTransform {

  transform(dateKey: string): string {
    // format should be exactly 'yyyymmdd', return empty string if not
    if (dateKey.length !== 8) return '';

    const year = parseInt(dateKey.slice(0, 4));
    const month = parseInt(dateKey.slice(4, 6)) - 1; // Adjust month index (-1)
    const day = parseInt(dateKey.slice(6, 8));
    const date = new Date(year, month, day);

    // Create a new Date object for today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of the day

    // Create a new Date object for tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if the given date is 'today'
    if (date.getTime() === today.getTime()) {
      return 'Today';
    }

    // Check if the given date is 'tomorrow'
    if (date.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }

    // Format the date
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    return `${daysOfWeek[date.getDay()]}, ${monthsOfYear[date.getMonth()]} ${date.getDate()}`;
  }

}
