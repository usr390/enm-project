import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blogPreview'
})
export class BlogPreviewPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value) {
      return '';
    }

    return value.length > 100 
      ? `${value.substring(0, 100)}<strong>... Read more</strong>` 
      : value;
  }

}
