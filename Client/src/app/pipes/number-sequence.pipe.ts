import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSequence',
  standalone: true,
})
export class NumberSequencePipe implements PipeTransform {
  transform(value: number): number[] {
    return Array.from({ length: value }, (_, i) => i + 1);
  }
}
