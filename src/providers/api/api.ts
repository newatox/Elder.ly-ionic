import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const BASE_URL = "http://familink.cleverapps.io/";

// PUBLIC
const LOGIN = "public/login";
const SIGNUP = "public/sign-in?contactsLength=0";
const PROFILES = "public/profiles";
const FORGOTTEN_PASSWORD = "public/forgot-password";

// PRIVATE
const CURRENT_AUTH = "secured/users/current";

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }


  // Authentications HTTP Requests
  login(body: {phone: String, password: String}) {
    console.log('API-PROVIDER', 'login');
    return this.http.post(`${BASE_URL}${LOGIN}`, body);
  }

  signup(body: {
    "phone": String,
    "password": String,
    "firstName": String,
    "lastName": String,
    "email": String,
    "profile": String // SENIOR, FAMILLE, MEDECIN
  }) {
    console.log('API-PROVIDER', 'signup');
    return this.http.post(`${BASE_URL}${SIGNUP}`, body);
  }

  getProfiles() {
    console.log('API-PROVIDER', 'profiles');
    return this.http.get(`${BASE_URL}${PROFILES}`);
  }

  forgottenPassword(body: {phone: String}) {
    console.log('API-PROVIDER', 'forgottenPassword');
    return this.http.post(`${BASE_URL}${FORGOTTEN_PASSWORD}`, body);
  }

  // Current User
  currentAuth(token: String) {
    console.log('API-PROVIDER', 'currentAuth');
    console.log('token', token);
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    console.log('Authorization', headers.get('Authorization'));
    console.log('Content-Type', headers.get('Content-Type'));
    console.log('URL', `${BASE_URL}${CURRENT_AUTH}`);
    this.http.get(`${BASE_URL}${CURRENT_AUTH}`,
      {headers: headers}
      ).subscribe(data => {
      console.log('data', data);
    }, error => {
      console.log('error', error);
    });
  }

}
