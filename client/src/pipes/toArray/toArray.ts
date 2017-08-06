import { Pipe, PipeTransform  } from '@angular/core';
import * as _ from 'underscore';


@Pipe({ name: 'toArray' })
export class ToArrayPipe implements PipeTransform {

  transform (input: any): any {
    if (!_.isObject(input)) {
      return input;
    }
    return Object.keys(input).map((value) => input[value]);
  }
}
