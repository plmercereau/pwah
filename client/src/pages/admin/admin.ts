import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  pages: Array<{title: string, component: any}>;

  constructor(
    public navCtrl: NavController,
  ) {
    this.pages = [
      {title: 'page.admin.orgUnits', component: 'OrgUnitPage'},
      {title: 'page.admin.orgUnitTypes', component: 'OrgUnitPage'},
      {title: 'page.admin.programTypes', component: 'OrgUnitPage'}
    ];
  }

  // TODO Organisation Types inspiré de CommCare:
  // Organisation type
  // Parent type
  // own cases
  // view child data


  openAdminPage(page){
    this.navCtrl.push(page.component);
  }

}
