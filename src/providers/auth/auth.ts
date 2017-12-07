import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import User from '../../models/User';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private auth: User;
  private token: any;

  constructor(public http: HttpClient, public api: ApiProvider) {
    console.log('Hello AuthProvider Provider');
  }

  login(phone: String, password: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.login({ phone, password })
        .subscribe((result: any) => {
          this.token = result['token'];
        },         (error) => {
          reject(error);
        },         () => {
          resolve(this.token);
        });
    });
  }

  signup(user: {
    phone: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    profile: String, // SENIOR, FAMILLE, MEDECIN
  }) {
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

  logout() {

  }

  getCurrentUser(token: String) {
    return new Promise((resolve, reject) => {
      this.api.currentAuth(token)
        .subscribe((result: any) => {
          this.auth = new User({
            phone: result.phone,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            profile : result.profile,
          });
        },         (error) => {
          reject(error);
        },         () => {
          resolve(this.auth);
        });
    });
  }

}
