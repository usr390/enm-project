import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listedHowLongAgo'
})
export class ListedHowLongAgoPipe implements PipeTransform {

  transform(value: string): string | null {
    const listedDate = new Date(value);
    const now = new Date();
  
    // Check if the date is 'today'
    if (listedDate.getDate() === now.getDate() &&
        listedDate.getMonth() === now.getMonth() &&
        listedDate.getFullYear() === now.getFullYear()) {
      return 'Today';
    }
  
    // Calculate the difference in hours
    const diffMs = now.getTime() - listedDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
  
    if (diffHours < 24) {
      // If less than 24 hours but not today, return '1 day ago'
      return '1 Day Ago';
    } else if (diffHours < 48) {
      // If between 24 and 48 hours, return '2 days ago'
      return '2 Days Ago';
    }
    // If more than 48 hours, return null
    return null;
  }
  
}
