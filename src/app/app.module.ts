import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ListContactsPage} from "../pages/list-contacts/list-contacts";
import {DetailsContactPage} from "../pages/details-contact/details-contact";
import {AddEditContactPage} from "../pages/add-edit-contact/add-edit-contact";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListContactsPage,
    DetailsContactPage,
    AddEditContactPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListContactsPage,
    DetailsContactPage,
    AddEditContactPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
