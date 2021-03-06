import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'ProfilePage';

  pages: Array<{title: string, component: any, method?: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    translate: TranslateService) {

    this.initializeApp();

    translate.setDefaultLang('en');

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'page.home', component: 'HomePage'},
      {title: 'page.profile', component: 'ProfilePage'},
      // {title: 'page.books.list', component: 'BooksPage'}, //XXX out
      {title: 'page.admin.list', component: 'AdminPage'},
      {title: 'page.logout', component: 'LoginPage', method: 'logout'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.method && page.method === 'logout') {
      // this.authService.logout();
    }
    this.nav.setRoot(page.component);
  }

}
