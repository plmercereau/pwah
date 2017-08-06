import { Pipe, PipeTransform  } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'isEmpty',
  pure: false
})
export class IsEmptyPipe implements PipeTransform {
  transform (input: any): any {
    return _.isEmpty(input);
  }
}
