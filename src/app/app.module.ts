import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ListContactsPage } from '../pages/list-contacts/list-contacts';
import { DetailsContactPage } from '../pages/details-contact/details-contact';
import { AddEditContactPage } from '../pages/add-edit-contact/add-edit-contact';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ApiProvider } from '../providers/api/api';
import { ContactsProvider } from '../providers/contacts/contacts';
import { AuthProvider } from '../providers/auth/auth';
import { ErrorProvider } from '../providers/error/error';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    MyApp,
    ListContactsPage,
    DetailsContactPage,
    AddEditContactPage,
    SignUpPage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListContactsPage,
    DetailsContactPage,
    AddEditContactPage,
    SignUpPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider,
    ContactsProvider,
    AuthProvider,
    ErrorProvider
  ]
})
export class AppModule {}
