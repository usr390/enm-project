import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artistIDtoCreationTime',
  pure: true
})
export class ArtistIDtoCreationTimePipe implements PipeTransform {

  /**
   * Convert Mongo ObjectId to a formatted date/time string.
   * @param value The _id value (e.g. '68a6c9bd64c4f16bad51d379' or 'ObjectId("...")')
   * @param style 'date' | 'datetime' | 'time' (default: 'date')
   * @param locale e.g. 'en-US' (default: browser locale)
   */
  transform(value: unknown, style: 'date' | 'datetime' | 'time' = 'date', locale?: string): string {
    const id = typeof value === 'string' ? value : '';
    if (!id) return '';

    // Handle ObjectId("...") or plain 24-hex
    const m = /^ObjectId\("([0-9a-fA-F]{24})"\)$/.exec(id);
    const hex = m ? m[1] : id;

    if (!/^[0-9a-fA-F]{24}$/.test(hex)) return '';

    const tsHex = hex.slice(0, 8);
    const seconds = Number.parseInt(tsHex, 16);
    if (!Number.isFinite(seconds)) return '';

    const date = new Date(seconds * 1000);

// Inside transform()
let options: Intl.DateTimeFormatOptions;
switch (style) {
  case 'datetime': // 👈 Use this if you want full date + time
    options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    };
    break;
  case 'time':
    options = { hour: 'numeric', minute: '2-digit' };
    break;
  case 'date':
  default:
    options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
}

    return (locale ? date.toLocaleString(locale, options) : date.toLocaleString(undefined, options));
  }
}