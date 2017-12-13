import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import User from '../../models/User';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private auth: User;
  private token: any;

  constructor(public http: HttpClient,
              private api: ApiProvider,
              public storage: Storage,
              public alertCtrl: AlertController,
              public translate: TranslateService) {
    console.log('Hello AuthProvider Provider');
  }

  login(phone: String, password: String): Promise<any> {
    return this.api.login({ phone, password }).toPromise()
      .then((result) => {
        this.token = result['token'];
        return this.saveToken(result['token']);
      })
      .then(() => { return this.token; })
      .catch((error) => {
        console.log('LOGIN ERROR', error);
      });
  }

  signup(user: {
    phone: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    profile: String, // SENIOR, FAMILLE, MEDECIN
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.signup({
        phone: user.phone,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profile: user.profile, // SENIOR, FAMILLE, MEDECIN
      })
        .subscribe((result: any) => {
          this.auth = new User(result);
        },         (error) => {
          reject(error);
        },         () => {
          resolve(this.auth);
        });
    });
  }

  logout(): void {
    this.storage.remove('token').then(() => console.log('TOKEN REMOVED'));
  }

  getCurrentUser(): Promise<any> {
    console.log('TOKEN', this.token);
    return this.api.currentAuth(this.token).toPromise()
      .then((result) => {
        return this.storage.set('user', result);
      })
      .catch((error) => {
        console.log('ERROR', error);
        this.invalidToken();
      })
      .then(() => {
        return this.storage.get('user');
      })
      .then((localUser) => {
        this.auth = new User({
          phone: localUser['phone'],
          firstName: localUser['firstName'],
          lastName: localUser['lastName'],
          email: localUser['email'],
          profile: localUser['profile'],
        });
        return this.auth;
      });
  }

  getProfiles(): Promise<any> {
    return this.api.getProfiles().toPromise()
      .then((profiles) => {
        return this.storage.set('profiles', profiles);
      })
      .catch((error) => {
        console.log('API ERROR', error);
      })
      .then(() => {
        return this.storage.get('profiles');
      });
  }

  forgot(phoneNumber: String): Promise<any> {
    return this.api.forgottenPassword(phoneNumber).toPromise()
      .then((result) => { return result; });
  }

  // Unused function
  /*
  private getToken(): Promise<any> {
    return this.storage.get('token'); // Promise
  }
  */

  private saveToken(token: String): Promise<any> {
    return this.storage.set('token', token);
  }

  invalidToken() {
    let password = '';
    const alert = this.alertCtrl.create({
      title: this.translate.instant('INVALID_TOKEN_TITLE'),
      subTitle: this.translate.instant('INVALID_TOKEN_SUBTITLE'),
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: this.translate.instant('PASSWORD'),
          min: 4,
          max: 4,
        },
      ],
      buttons: [
        {
          text: this.translate.instant('CANCEL_LABEL'),
          role: 'cancel',
          handler: () => {
            console.log('Cancel pressed in Invalid token box');
          },
        },
        {
          text: this.translate.instant('OK_LABEL'),
          handler: (data) => {
            if (/^[0-9]{4,}$/.test(data.password)) {
              console.log('Login from invalid token alert');
              this.login(this.auth.phone, data.password)
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {
                  console.log(error.message);
                  this.invalidToken();
                });
            } else {
              console.log('Invalid password from invalid token alert');
              this.invalidToken();
            }
          },
        },
      ],
    });
    alert.present().then();
  }
}
