/* tslint:disable */

declare var Object: any;
export interface OrgUnitInterface {
  "name": string;
  "shortName"?: string;
  "code"?: string;
  "description"?: string;
  "id"?: any;
  "parentId"?: any;
  "ancestorIds"?: Array<any>;
  parent?: OrgUnit;
  children?: OrgUnit[];
  ancestors?: OrgUnit[];
}

export class OrgUnit implements OrgUnitInterface {
  "name": string;
  "shortName": string;
  "code": string;
  "description": string;
  "id": any;
  "parentId": any;
  "ancestorIds": Array<any>;
  parent: OrgUnit;
  children: OrgUnit[];
  ancestors: OrgUnit[];
  constructor(data?: OrgUnitInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrgUnit`.
   */
  public static getModelName() {
    return "OrgUnit";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrgUnit for dynamic purposes.
  **/
  public static factory(data: OrgUnitInterface): OrgUnit{
    return new OrgUnit(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'OrgUnit',
      plural: 'OrgUnits',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "shortName": {
          name: 'shortName',
          type: 'string'
        },
        "code": {
          name: 'code',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "parentId": {
          name: 'parentId',
          type: 'any'
        },
        "ancestorIds": {
          name: 'ancestorIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
      },
      relations: {
        parent: {
          name: 'parent',
          type: 'OrgUnit',
          model: 'OrgUnit'
        },
        children: {
          name: 'children',
          type: 'OrgUnit[]',
          model: 'OrgUnit'
        },
        ancestors: {
          name: 'ancestors',
          type: 'OrgUnit[]',
          model: 'OrgUnit'
        },
      }
    }
  }
}
