import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'yn' })
export class YNPipe implements PipeTransform {
  transform(value: boolean, yes: string, no: string): string {
    if (value) {
      return '<span class="badge badge-success">' + (yes || 'Si') + '</span>';
    } else {
      return '<span class="badge badge-error">' + (no || 'No') + '</span>';
    }
  }
}
