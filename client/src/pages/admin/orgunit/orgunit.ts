import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Content, IonicPage, AlertController} from 'ionic-angular';

import {FormGroup} from "@angular/forms";
// import { DynamicFormControlModel, DynamicInputModel } from "@ng2-dynamic-forms/core";
import {TranslateService} from "@ngx-translate/core";
import {LoopBackConfig} from "../../../shared/sdk/lb.config";
import {BASE_URL, API_VERSION} from "../../../shared/base.url";
import {OrgUnitApi} from "../../../shared/sdk/services/custom/OrgUnit";
import {OrgUnit} from "../../../shared/sdk/models/OrgUnit";
//TODO code du node ROOT en parametre de l'application

@IonicPage()
@Component({
  selector: 'page-orgunit',
  templateUrl: 'orgunit.html',
})
export class OrgUnitPage {
  // @ViewChild(Content) content: Content;
  public edit: boolean = false;
  public modelDefinition = OrgUnit.getModelDefinition();
  public orgUnit: OrgUnit = <OrgUnit>{};
  // formModel: DynamicFormControlModel[] = ORGUNIT_FORM_MODEL;
  formGroup: FormGroup;
  isLoading = true; // CHANGED not used anymore, but might be useful for the toaster

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private translate: TranslateService,
              private orgUnitApi: OrgUnitApi) {
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);

    this.getData(this.navParams.get('orgUnit'), this.navParams.get('new'));
    // TODO check how to update new information after a pop()
  }

  getData(oU, create?: boolean) {
    var req = {};
    if (oU) {
      this.orgUnit = oU;
      req = {where: {id: oU.id}};
    } else req = {where: {code: 'ROOT'}};
    this.orgUnitApi.findOne({
      ...req,
      ...{
        include: [
          {
            relation: 'children',
            scope: {order: 'name ASC'}
          },{
            relation: 'ancestors',
            fields: 'name', // TODO check if we only get the name :)
          }
        ]
      }
    }).subscribe((res: OrgUnit) => {
      if (create){
        this.orgUnit = new OrgUnit();
        this.orgUnit.parent = res;
        this.orgUnit.ancestors = res.ancestors;
        this.orgUnit.ancestors.unshift(res);
        this.initForm();
      } else {
        this.orgUnit = res;
      }
    });
  }

  ionViewWillEnter() {
    /* Not using the constructor as we need to update the children list in the
    page that has been pushed already while we pop the page of the creation of
    the child */
    // this.content.resize();
  }

  private initForm() {
    this.edit = true;
    // this.formGroup = this.formService.createForm(this.formModel, this.orgUnit);
  }

  actionAddChild() {
    this.navCtrl.push(OrgUnitPage, {orgUnit: this.orgUnit, new: true});
  }

  actionDeleteChild(child) { // TODO not only removes from the list of children, but also deletes the document
    // TODO make it compliant with Material Design (position of the buttons)
    let alert = this.alertCtrl.create({
      title: this.translate.instant('page.admin.deleteOrgUnit'),
      message: this.translate.instant('question.deleteOrgUnit', {orgUnit: child.name}),
      buttons: [
        {
          text: this.translate.instant('button.cancel'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('button.delete'),
          handler: () => {
            //TODO coder
            //TODO cascade OR not possible to delete if children -> server side
            // this.children.splice(this.children.indexOf(child), 1);
          }
        }
      ]
    });
    alert.present();

  }

  actionMoveChild(child) {
    //  TODO choix via le modal de Yann Github, uniquement possible pour les types d'organisation le permettant (un projet ne peut être déplacé que dans une mission)
  }

  actionPushOrgUnit(orgUnit) {
    this.navCtrl.push(OrgUnitPage, {orgUnit: orgUnit});
  }

  actionEdit() {
    this.edit = true;
    this.initForm();
  }

  actionCancel() {
    if (!this.orgUnit.id) { // We are in a new and unsaved page so we leave it
      this.navCtrl.pop();
    } else { // else we stay in the same OU page, but we come back to the read mode
      this.edit = false;
    }
  }

  actionSave() { //TODO secure in catching errors (client+server)
    // this.orgUnit = this.formService.saveForm('orgunit', this.orgUnit, this.formModel);
    //TODO
    this.edit = false;
  }

  // isNew() {
  //   return (this.edit && !this.orgUnit.id);
  // }
}
