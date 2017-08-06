import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {DynamicFormService, DynamicInputModel} from "@ng2-dynamic-forms/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class FormServiceProvider {
  constructor(public http: Http,
              private formService: DynamicFormService,
              private translate: TranslateService
  ) {}

  createForm(formModel, object?, children?){ //TODO extend to complex forms with nested objects
    if (object){ // Load default values into form
      for (let el of formModel){
        (<DynamicInputModel>el).value=object[el.id];
        (<DynamicInputModel>el).label = this.translate.instant((<DynamicInputModel>el).label);
        (<DynamicInputModel>el).placeholder = this.translate.instant((<DynamicInputModel>el).placeholder);
      }
    }
    return this.formService.createFormGroup(formModel);;
  }

  saveForm(collection, object, formModel){
    for (let el of formModel){
      let elok = <DynamicInputModel>el;
      object[elok.id] = elok.value;
    }
    if (!object._id){ // new document
  //TODO
    } else { // update existing document
      object.save();
    }
    return object;
  }
}
