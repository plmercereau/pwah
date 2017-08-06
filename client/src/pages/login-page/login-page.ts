import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  private loginData: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder) {

    this.loginData = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])], // TODO revoir minLength
    });
  }

  ionViewDidLoad() {
    //hide menu when on the login page, regardless of the screen resolution
    this.menuCtrl.enable(false);
  }

  login() {
    //use this.loginData.value to authenticate the user
  }

  redirectToHome() {
    this.navCtrl.setRoot('ProfilePage');
    this.menuCtrl.enable(true);
  }

  /**
   * Opens a paage
   *
   * @param page string Page name
   */
  openPage(page: string) {
    this.navCtrl.push(page);
  }
}
