import { Component } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage  {

  constructor(
    public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
  }

}
