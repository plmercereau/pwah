import { Component } from '@angular/core';
import { MenuController, IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public menuCtrl: MenuController,
  ) {
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
  }

}
