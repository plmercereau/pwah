import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform (input: any): any {
    if (!_.isArray(input)) {
      return input;
    }
    return [...input].reverse();
  }
}
