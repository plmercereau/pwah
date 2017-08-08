import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DynamicFormService, DynamicInputModel, DynamicFormControlModel } from "@ng2-dynamic-forms/core";
import { TranslateService } from "@ngx-translate/core";
import * as _ from 'underscore';
import { OrgUnit } from "../../shared/sdk/models/OrgUnit";

/*
  Generated class for the FormProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FormProvider {
  constructor(public http: Http,
              private formService: DynamicFormService,
              private translate: TranslateService) {
  }

  createFormModel(modelDefinition, object?, formType?, filter?) {
    //TODO transformer en observable/promise pour pouvoir par exemple chager les informations en asynchrone, par exemple les traductions?
    //TODO dans ce cas: createFormModel.subscribe(result => this.formModel = result)
    //TODO extend to complex forms with nested objects
    let modelName = 'OrgUnit'; //TODO make it automatic
    let fDefinition = modelDefinition['forms'][formType ? formType : 'default'];
    let fields = fDefinition ? fDefinition['fields'] : Object.keys(modelDefinition['properties']);
    let formModel: DynamicFormControlModel[] = [];
    for (let property of fields) {
      switch (_.unescape(modelDefinition['properties'][property]['type'])) {
        case 'string':
          //TODO refine the type of input!!!
          formModel.push(new DynamicInputModel({
              id: modelDefinition['properties'][property]['name'],
              // TODO maniere plus elegante de gerer des string dans le label et le placeholder avec des $?
              //TODO considerer un helper pour rendre DRY la gestion des traductions
              label: this.translate.instant("collection." + modelName + ".property." + modelDefinition['properties'][property]['name'] + ".label"),
              placeholder: this.translate.instant("collection." + modelName + ".property." + modelDefinition['properties'][property]['name'] + ".placeholder"),
              maxLength: 42, //TODO validations
              value: object ? object[property] : ''
            })
          );
          break;
        case 'any':
          //TODO manage foreign key data. For lists e.g. dropdowns, define options with a REST request
          //TODO 2: default REST requests, but also custom REST request for each form. If not defined for a specific form, get the default one
          break;
        case 'Array<any>':
          //TODO manage many to one foreign key data
          break;
        default:
          console.log("Unexpected type of property to handle");
      }
    }
    return formModel;
  }

  createFormGroup(formModel) {// TODO si on part sur de l'asynchrone, fusionner avec la fonction ci-dessus
    // TODO de toute manière, voir si on ne peut pas faire uniquement figuer formModel ou formGroup dans le composant Page
    return this.formService.createFormGroup(formModel);
  }

  saveForm(object, formModel) {
    //TODO mode asynchrone, retourner une promise
    //TODO does 'value' property exists for every kind of form input?
    //TODO https://stackoverflow.com/questions/15338610/dynamically-loading-a-typescript-class-reflection-for-typescript
    let data = Object.assign({}, ...formModel.map(a => ({[a.name]: a['value']})));
    if (!object._id) { // new document
      //TODO
    } else { // update existing document
      // object.save();
    }
    return object;
  }

}
