import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'linkify'})
export class LinkifyPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/https?:\/\/[^\s]+/g, (url) => {
      return `<a class="note-links" href="${url}" target="_blank" rel="noopener noreferrer">here</a>`;
    });
  }
}
