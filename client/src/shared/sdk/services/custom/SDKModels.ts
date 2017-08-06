/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { OrgUnit } from '../../models/OrgUnit';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    OrgUnit: OrgUnit,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
