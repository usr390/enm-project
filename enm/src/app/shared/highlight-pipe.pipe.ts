import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlightPipe'
})
export class HighlightPipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  createRegExp(text: string): RegExp {
    // Escape special regex characters and replace each character with a version that optionally allows an apostrophe after it
    const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/./g, (char) => char + "['’]?");

    return new RegExp(escapedText, 'gi');
  }

  transform(value: string | null | undefined, args: string | null | undefined): SafeHtml {
    if (value === null || value === undefined || !args) {
      return value || '';
    }

    // Create a RegExp from the search term
    const re = this.createRegExp(args);

    // Replace the matched parts in the original string with highlighted text
    const highlightedValue = value.replace(re, match => `<mark>${match}</mark>`);

    return this.sanitizer.bypassSecurityTrustHtml(highlightedValue);
  }


}
