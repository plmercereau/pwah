import {OrgUnit} from "../sdk/models/OrgUnit";

export const FORM_ORG_UNIT = {
  ...OrgUnit.getModelDefinition(),
  dataStructure: ['tree'],
  validations:{

  },
  include: [
    {
      relation: 'children',
      scope: {order: 'name ASC'}
    },{
      relation: 'ancestors',
      fields: 'name', // TODO check if we only get the name :)
    }
  ],
  findOneDefault: {code: 'ROOT'},
  forms: { //TODO rename into 'views' ?
    default: {
      //TODO define general order, including the six categories below
      //TODO revoir la structure de ces six categories
      input_fields: ['name','code','shortName'],
      input_relations_ref: [], // TODO
      input_relations_nested: [], //TODO
      computed_fields: [], //TODO
      computed_relations_ref: ['parent'], //TODO add the one to many relations
      computed_relations_nested: [], //TODO
    }
  }
}
