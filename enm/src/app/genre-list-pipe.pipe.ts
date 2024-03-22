import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genreListPipe'
})
export class GenreListPipePipe implements PipeTransform {

  transform(value: any[], separator: string = ', '): string {
    return value.join(separator);
  }

}
