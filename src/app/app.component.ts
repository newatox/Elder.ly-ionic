import { Component, ViewChild } from '@angular/core';
import { AlertController, Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ListContactsPage } from '../pages/list-contacts/list-contacts';
import { AuthProvider } from '../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';
import User from '../models/User';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  listPage: any = ListContactsPage;
  pages: any;

  public currentUser: User;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public events: Events,
    public auth: AuthProvider,
    public translate: TranslateService,
  ) {
    this.initializeApp();

    // Lock app orientation
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      .catch((error) => {
        console.log('Not a mobile device');
      });

    // Catch events
    this.events.subscribe('auth:login', () => { this.setUIUserProfilInfos(); });

    // Translate
    translate.setDefaultLang('fr');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

    });
  }

  userLogout() {
    this.menuCtrl.close();
    this.auth.logout();
    this.nav.goToRoot({ animate: true });
  }

  setUIUserProfilInfos() {
    // Get current user
    this.auth.getCurrentUser()
      .then((auth) => {
        console.log('AUTH', auth);
        this.currentUser = auth;
      })
      .catch((error) => {
        console.log('ERROR GET CURRENT USER', error);
        // TODO : i18n
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error.error.message,
          buttons: ['OK'],
        });
        alert.present();
      });
  }
}
