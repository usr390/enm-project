import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artistIDtoCreationTime',
  pure: true
})
export class ArtistIDtoCreationTimePipe implements PipeTransform {

  transform(value: unknown): string {
    const id = typeof value === 'string' ? value : '';
    if (!id) return '';

    // Handle ObjectId("...") or plain 24-hex
    const match = /^ObjectId\("([0-9a-fA-F]{24})"\)$/.exec(id);
    const hex = match ? match[1] : id;

    if (!/^[0-9a-fA-F]{24}$/.test(hex)) return '';

    // Extract timestamp from ObjectId
    const tsHex = hex.slice(0, 8);
    const seconds = Number.parseInt(tsHex, 16);
    if (!Number.isFinite(seconds)) return '';

    const date = new Date(seconds * 1000);

    // **Manual MM/DD/YYYY hh:mm AM/PM formatting**
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
  }
}