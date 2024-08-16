import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blogifyBody'
})
export class BlogifyBodyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value) {
      return '';
    }

    // Replace the literal '\n' with <p></p> tags to create new paragraphs
    const paragraphs = value.split('\\n').map(line => `<p>${line.trim()}</p>`).join('');

    return paragraphs;
  }

}
