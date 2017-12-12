import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PhonePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (value == null) {
      return '';
    }
    return this.chunk(value,2).join(' ');
  }

  private chunk(str, n) {
    const ret = [];
    const len = str.length;

    for (let i = 0; i < len; i += n) {
      ret.push(str.substr(i, n));
    }

    return ret;
  }
}
