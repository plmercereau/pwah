import {PipeTransform, Pipe} from '@angular/core';
import * as _ from 'underscore';
import {extractDeepPropertyByMapKey} from "../../shared/helpers/helpers";

@Pipe({name: 'filterBy'})
export class FilterByPipe implements PipeTransform {

  transform(input: any, props: Array<string>, search: any = '', strict: boolean = false): any[] {
    if (!Array.isArray(input) || (!_.isString(search) && !_.isNumber(search) && !_.isBoolean(search))) {
      return input;
    }
    const term = String(search).toLowerCase();

    return input.filter((obj) => {
      return props.some((prop) => {
        const value = extractDeepPropertyByMapKey(obj, prop),
          strValue: string = String(value).toLowerCase();

        if (_.isUndefined(value)) {
          return false;
        }

        return strict
          ? term === strValue
          : !!~strValue.indexOf(term);
      });
    });
  }
}
