import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordifiedDateKey'
})
export class WordifiedDateKeyPipe implements PipeTransform {

  transform(dateKey: string): string {
    if (dateKey.length !== 8) return '';

    // Define a mapping of dates to holiday names
    const holidays: {[key: string]: string} = {
      '0101': "New Year's Day",
      '0214': "Valentine's Day",
      '0317': "St. Patrick's Day",
      '0704': "Independence Day",
      '1031': "Halloween",
      '1225': "Christmas Day"
      // Add more holidays here
    };

    const monthDay = dateKey.slice(4); // Extract month and day
    if (holidays[monthDay]) {
      return holidays[monthDay]; // Return the holiday name if it exists
    }

    const year = parseInt(dateKey.slice(0, 4));
    const month = parseInt(dateKey.slice(4, 6)) - 1;
    const day = parseInt(dateKey.slice(6, 8));
    const eventDate = new Date(year, month, day);

    eventDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (eventDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (eventDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }

    const currentDay = today.getDay();
    const daysToLastMonday = (currentDay + 6) % 7;
    const daysToNextSunday = 7 - currentDay;

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - daysToLastMonday);

    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + daysToNextSunday);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (eventDate >= weekStart && eventDate <= weekEnd) {
      return daysOfWeek[eventDate.getDay()];
    } else {
      return `${daysOfWeek[eventDate.getDay()]}, ${monthsOfYear[eventDate.getMonth()]} ${eventDate.getDate()}`;
    }
  }
}
