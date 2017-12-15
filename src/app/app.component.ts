import { Component, ViewChild } from '@angular/core';
import { AlertController, Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ListContactsPage } from '../pages/list-contacts/list-contacts';
import { AuthProvider } from '../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';
import { AboutPage } from '../pages/about/about';
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
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public events: Events,
    public auth: AuthProvider,
    public translate: TranslateService,
  ) {
    this.initializeApp();

    this.statusBar.backgroundColorByHexString('39304A');
    this.statusBar.styleLightContent();

    // Catch events
    this.events.subscribe('auth:login', () => { this.setUIUserProfilInfos(); });

    // Translate
    translate.setDefaultLang('fr');

    // Back button action
    this.platform.registerBackButtonAction(() => { this.backPressed(); }, 1);
  }

  initializeApp() {
    this.platform.ready().then(() => {

    });
  }

  backPressed() {
    if (this.nav.canGoBack()) {
      this.nav.pop();
    } else {
      this.platform.exitApp();
    }
  }

  goToAbout() {
    this.menuCtrl.close();
    this.nav.push(AboutPage).then();
  }

  userLogout() {
    const delAlert = this.alertCtrl.create({
      title: this.translate.instant('MENU_LOGOUT'),
      message : this.translate.instant('ARE_YOU_SURE_TO_LOGOUT'),
      buttons: [
        {
          text: this.translate.instant('CANCEL_LABEL'),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.translate.instant('LOGOUT'),
          handler: () => {
            console.log('Confirm clicked');
            this.menuCtrl.close();
            this.auth.logout();
            this.nav.goToRoot({ animate: true });
          },
        },
      ],
    });
    delAlert.present();
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
