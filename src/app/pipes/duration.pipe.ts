import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform minutes (number) in duration string like '1h 30m'
 */
@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  private getPluralEnding(count) {
    return count > 2 ? 's' : '';
  }

  transform(minutes: number): string {
    const h = Math.trunc(minutes / 60);
    const m = minutes % 60;

    const result = [];

    if (h) {
      result.push(`${h} hour${this.getPluralEnding(h)}`);
    }

    if (m) {
      result.push(`${m} minute${this.getPluralEnding(m)}`);
    }

    return result.join(' ');
  }
}
