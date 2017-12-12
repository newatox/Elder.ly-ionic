import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import User from '../../models/User';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private auth: User;
  private token: any;

  constructor(public http: HttpClient, private api: ApiProvider, public storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  login(phone: String, password: String): Promise<any> {
    return this.api.login({ phone, password }).toPromise()
      .then((result) => {
        this.token = result['token'];
        return this.saveToken(result['token']);
      })
      .then(() => { return this.token; });
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
        this.auth = new User({
          phone: result['phone'],
          firstName: result['firstName'],
          lastName: result['lastName'],
          email: result['email'],
          profile : result['profile'],
        });
        return this.auth;
      });
  }

  getProfiles(): Promise<any> {
    return this.api.getProfiles().toPromise()
      .then((profiles) => {
        return this.storage.set('profiles', profiles);
      })
      .catch((error) => { console.log('API ERROR', error); })
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
}
