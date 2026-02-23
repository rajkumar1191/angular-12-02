import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: true, // default is true, which means the pipe is pure and will only be re-evaluated when the input value changes. If set to false, the pipe will be re-evaluated on every change detection cycle.
})
export class ReversePipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (!value || typeof value !== 'string') {
      return value;
    }
    return (value as string).split('').reverse().join('');// ["A", "n", "g", "u", "l", "a", "r"] => ["r", "a", "l", "u", "g", "n", "A"] => "ralugna"
  }
}
