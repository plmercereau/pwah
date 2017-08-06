import { Pipe, PipeTransform  } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform (input: any, character: string = ''): any {
    if (!_.isArray(input)) {
      return input;
    }
    return input.join(character);
  }
}
