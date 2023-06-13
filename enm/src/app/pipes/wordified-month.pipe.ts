import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordifiedMonth'
})
export class WordifiedMonthPipe implements PipeTransform {

  transform(month: number): string {

    // transform operates on precisely integers 1-12, so check month input is valid 
    if (month < 1 || month > 12) return '';

    // wordify
    if (month ===  1) return 'January';
    if (month ===  2) return 'February';
    if (month ===  3) return 'March';
    if (month ===  4) return 'April';
    if (month ===  5) return 'May';
    if (month ===  6) return 'June';
    if (month ===  7) return 'July';
    if (month ===  8) return 'August';
    if (month ===  9) return 'September';
    if (month === 10) return 'October';
    if (month === 11) return 'November';
    else return 'December';

  }
}
