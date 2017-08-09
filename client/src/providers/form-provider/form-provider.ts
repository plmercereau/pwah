import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DynamicFormService, DynamicInputModel, DynamicFormControlModel } from "@ng2-dynamic-forms/core";
import { TranslateService } from "@ngx-translate/core";
import * as _ from 'underscore';
import {OrgUnitApi} from "../../shared/sdk/services/custom/OrgUnit";
import {FORMS} from "../../shared/models/index";

/*
  Generated class for the FormProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FormProvider {
  constructor(public http: Http,
              private formService: DynamicFormService,
              private translate: TranslateService,
              private orgUnitApi: OrgUnitApi) { //TODO rendre générique
  }

  createFormModel(object?, formType?, filter?) {
    //TODO transformer en observable/promise pour pouvoir par exemple chager les informations en asynchrone, par exemple les traductions?
    //TODO dans ce cas: createFormModel.subscribe(result => this.formModel = result)
    //TODO extend to complex models with nested objects
    let modelName = 'OrgUnit'; //TODO make it DRY
    let modelDefinition = FORMS[modelName];
    let formModel: DynamicFormControlModel[] = [];
    for (let property of this.getFormProperties('input_fields', formType)) {
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

  private getFormProperties(propertyType, formType?){
    let modelName = 'OrgUnit'; //TODO make it DRY
    let modelDefinition = FORMS[modelName];
    let fDefinition = modelDefinition['forms'][formType ? formType : 'default'];
    return fDefinition ? fDefinition[propertyType] : Object.keys(modelDefinition['properties']);
  }

  private getComputedValues(document, formType?){
    // TODO only working for computed_relations_ref now. make it work with computed_field and computed_relations_nested
    let modelName = 'OrgUnit'; //TODO make it DRY
    let modelDefinition = FORMS[modelName];
    let properties =this.getFormProperties('computed_relations_ref');
    let result = {};
    properties.forEach(property => {
      if (_.unescape(modelDefinition['relations'][property]['type']).endsWith("[]")){
        //TODO one to many ref
      } else {
        result[property+'Id'] = document[property]? document[property].id : document[property+'Id'];
      }
    });
    return result;
  }

  saveForm(document, formModel, formType?) {
    //TODO mode asynchrone, retourner une promise
    //TODO does 'value' property exists for every kind of form input?
    //TODO https://stackoverflow.com/questions/15338610/dynamically-loading-a-typescript-class-reflection-for-typescript
    let data = Object.assign({}, ...formModel.map(a => ({[a.name]: a['value']}))); // constructs an object with the value of every form input
    Object.assign(data, this.getComputedValues(document,formType));
    if (document.id){ // Adds id to the form data, and possible data to update that is not in the form
      Object.assign(data, {id:document.id});
    }
    data = _.pick(data, _.identity); // remove null or undefined values
    return this.orgUnitApi.upsertPatch(data); // Sends only the form data and the existing id to the server
    //TODO reload children, ancestors...
    //TODO handle a callback
  }

}
