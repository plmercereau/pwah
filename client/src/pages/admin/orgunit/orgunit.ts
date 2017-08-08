import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage, AlertController} from 'ionic-angular';

import {FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {LoopBackConfig} from "../../../shared/sdk/lb.config";
import {BASE_URL, API_VERSION} from "../../../shared/base.url";
import {OrgUnitApi} from "../../../shared/sdk/services/custom/OrgUnit";
import {OrgUnit} from "../../../shared/sdk/models/OrgUnit";
import {DynamicFormControlModel} from "@ng2-dynamic-forms/core";
import {FormProvider} from "../../../providers/form-provider/form-provider";
import {FORMS} from "../../../shared/forms/index";

//TODO code du node ROOT en parametre de l'application

@IonicPage()
@Component({
  selector: 'page-orgunit',
  templateUrl: 'orgunit.html',
})
export class OrgUnitPage {
  // @ViewChild(Content) content: Content; //TODO comprendre à quoi ça sert
  public edit: boolean = false;
  public document: OrgUnit = <OrgUnit>{};
  public modelDefinition: any = FORMS.OrgUnit; //TODO rendre générique

  formModel: DynamicFormControlModel[];
  formGroup: FormGroup;
  isLoading = true; // CHANGED not used anymore, but might be useful for the toaster

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private formService: FormProvider,
              private translate: TranslateService,
              private orgUnitApi: OrgUnitApi //TODO rendre générique
  ) {
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);

    this.getData(this.navParams.get('document'), this.navParams.get('new'));
    // TODO check how to update new information after a pop()
  }

  getData(documentData, newDocument?: boolean) {
    var req = {};
    if (documentData) {
      this.document = documentData;
      req = {where: {id: documentData.id}}; //TODO in form model
    } else req = {where: {code: 'ROOT'}}; //TODO in form omdel
    this.orgUnitApi.findOne({ //TODO in form model
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
      if (newDocument){ // TODO rendre générique
        this.document = new OrgUnit();
        this.document.parent = res;
        this.document.ancestors = res.ancestors;
        this.document.ancestors.unshift(res);
        this.initForm();
      } else {
        this.document = res;
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
    // TODO no need to reload the form several times? Probably not as we need to get the values from the object to the form input
    // TODO chargement asynchrone? Dans ce cas, fusionner les deus méthodes ci-dessous en une seule
    this.formModel = this.formService.createFormModel(this.modelDefinition, this.document);
    this.formGroup = this.formService.createFormGroup(this.formModel);
  }

  actionAddChild() {
    this.navCtrl.push(OrgUnitPage, {document: this.document, new: true});
  }

  //TODO reflechir a comment DRY-ifier cette partie pour une autre collection...
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

  actionPush(document) {
    this.navCtrl.push(OrgUnitPage, {document: document});//TODO rendre générique (classe OrgUnitPage)
  }

  actionEdit() {
    this.edit = true;
    this.initForm();
  }

  actionCancel() {
    //TODO prompt if modifications exists -> "discard changes"?
    //TODO prompt for every pop, also the one on clicking on the nav bar
    if (!this.document.id) { // We are in a new and unsaved page so we leave it
      this.navCtrl.pop();
    } else { // else we stay in the same OU page, but we come back to the read mode
      this.edit = false;
    }
  }

  actionSave() { //TODO secure in catching errors (client+server)
    //TODO make generic, not only for OrgUnit
    //TODO mode asynchrone: subscribe( res => this.orgUnit = res)
    this.formService.saveForm(this.document, this.formModel);
    this.edit = false;
  }

}
