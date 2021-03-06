import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListContactsPage } from '../pages/list-contacts/list-contacts';
import { DetailsContactPage } from '../pages/details-contact/details-contact';
import { AddEditContactPage } from '../pages/add-edit-contact/add-edit-contact';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ApiProvider } from '../providers/api/api';
import { ContactsProvider } from '../providers/contacts/contacts';
import { AuthProvider } from '../providers/auth/auth';
import { ErrorProvider } from '../providers/error/error';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { PhonePipe } from '../pipes/phone/phone';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { EmailComposer } from '@ionic-native/email-composer';
import { Network } from '@ionic-native/network';
import { NetworkService } from '../services/NetworkService';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { AboutPage } from '../pages/about/about';


@NgModule({
  declarations: [
    MyApp,
    ListContactsPage,
    DetailsContactPage,
    AddEditContactPage,
    SignUpPage,
    AboutPage,
    LoginPage,
    PhonePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListContactsPage,
    DetailsContactPage,
    AddEditContactPage,
    SignUpPage,
    AboutPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider,
    ContactsProvider,
    AuthProvider,
    ErrorProvider,
    CallNumber,
    SMS,
    EmailComposer,
    Network,
    NetworkService,
    FavoriteProvider,
  ],
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
