import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ContactCellComponent } from '../components/contact-cell/contact-cell';
import { ApiProvider } from '../providers/api/api';
import { ContactsProvider } from '../providers/contacts/contacts';
import { AuthProvider } from '../providers/auth/auth';
import { ErrorProvider } from '../providers/error/error';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    ListContactsPage,
    DetailsContactPage,
    AddEditContactPage,
    SignUpPage,
    LoginPage,
    ContactCellComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListContactsPage,
    DetailsContactPage,
    AddEditContactPage,
    SignUpPage,
    LoginPage,
    ContactCellComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider,
    ContactsProvider,
    AuthProvider,
    ErrorProvider,
  ],
})
export class AppModule {}
