import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listedHowLongAgo'
})
export class ListedHowLongAgoPipe implements PipeTransform {

  transform(value: string): string | null {
    // Parse the input value to a Date object
    const listedDate = new Date(value);
    // Get the current date
    const now = new Date();
    // Calculate the difference in milliseconds
    const diffMs = now.getTime() - listedDate.getTime();
    // Convert milliseconds to hours
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 24) {
      // If less than 24 hours, return the hours
      return `${Math.floor(diffHours)} hours ago`;
    } else if (diffHours < 48) {
      // If between 24 and 48 hours, return "1 day"
      return '1 day ago';
    } else if (diffHours < 72) {
      // If between 48 and 72 hours, return "2 days"
      return '2 days ago';
    }
    // If more than 48 hours, return nothing
    return null;
  }
}
