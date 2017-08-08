import {PipeTransform, Pipe} from '@angular/core';
import * as _ from 'underscore';


@Pipe({name: 'isUndefined'})
export class IsUndefinedPipe implements PipeTransform {

  transform(input: any): boolean {
    return _.isUndefined(input);
  }
}
