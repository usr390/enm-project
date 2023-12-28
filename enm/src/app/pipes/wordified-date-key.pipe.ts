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
  const eventDate = new Date(year, month, day);

  // Reset time to start of the day for accurate comparisons
  eventDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Check if the given date is 'today' or 'tomorrow'
  if (eventDate.getTime() === today.getTime()) {
    return 'Today';
  } else if (eventDate.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  }

  // Calculate start and end of the current week (Monday to Sunday)
  const currentDay = today.getDay();
  const daysToLastMonday = (currentDay + 6) % 7; // 0 is Sunday in getDay()
  const daysToNextSunday = 7 - currentDay;

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - daysToLastMonday);

  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + daysToNextSunday);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Check if the date is within this week
  if (eventDate >= weekStart && eventDate <= weekEnd) {
    // If it's this week, just return the day of the week
    return daysOfWeek[eventDate.getDay()];
  } else {
    // If it's beyond this week, return the full format
    return `${daysOfWeek[eventDate.getDay()]}, ${monthsOfYear[eventDate.getMonth()]} ${eventDate.getDate()}`;
  }
}


}
