import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private auth: any;
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

  signup() {

  }

  logout() {

  }

  getAuth() {

  }

  getToken(): String {
    return this.token;
  }

}
