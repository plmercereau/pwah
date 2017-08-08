import {OrgUnit} from "../sdk/models/OrgUnit";

export const FORM_ORG_UNIT = {
  ...OrgUnit.getModelDefinition(),
  validations:{

  },
  forms: { //TODO rename into 'views' ?
    default: {
      fields: ['name','code','shortName']
    }
  }
}
