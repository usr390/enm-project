import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseUpdates'
})
export class ReverseUpdatesPipe implements PipeTransform {

  transform(value: any[]): any[] {
    if (!value) return [];
    return value.slice().reverse();
  }

}
