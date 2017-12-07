import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ListContactsPage } from '../pages/list-contacts/list-contacts';
import {ApiProvider} from "../providers/api/api";

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  listPage: any = ListContactsPage;
  pages: any;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, private screenOrientation: ScreenOrientation) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'List', component: ListContactsPage },
    ];

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    /*this.auth.login();*/
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component).then();
  }
}
