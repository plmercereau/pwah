import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrgUnitPage } from './orgunit';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicFormsIonicUIModule } from "@ng2-dynamic-forms/ui-ionic";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    OrgUnitPage,
  ],
  imports: [
    IonicPageModule.forChild(OrgUnitPage),
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsIonicUIModule,
    TranslateModule.forChild(),
    PipesModule
  ],
  exports: [
    OrgUnitPage
  ]
})
export class OrgUnitsPageModule {}
