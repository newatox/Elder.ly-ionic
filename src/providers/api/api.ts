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
const CONTACTS = "secured/users/contacts/";

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
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${BASE_URL}${SIGNUP}`, body,{headers: headers});
  }

  getProfiles() {
    console.log('API-PROVIDER', 'profiles');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${BASE_URL}${PROFILES}`, {headers: headers});
  }

  forgottenPassword(body: {phone: String}) {
    console.log('API-PROVIDER', 'forgottenPassword');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${BASE_URL}${FORGOTTEN_PASSWORD}`, body,{headers: headers});
  }

  // Current User HTTP Requests
  currentAuth(token: String) {
    console.log('API-PROVIDER', 'currentAuth');
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    this.http.get(`${BASE_URL}${CURRENT_AUTH}`, {headers: headers} );
  }

  // Contacts HTTP Requests
  contacts(token: String) {
    console.log('API-PROVIDER', 'contacts');
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    return this.http.get (`${BASE_URL}${CONTACTS}`,
      {headers: headers}
    );
  }

  createContact(contact: {
    "phone": String,
    "firstName": String,
    "lastName": String,
    "email": String,
    "profile": String,
    "gravatar" : String,
    "isFamilinkUser" : Boolean,
    "isEmergencyUser": Boolean
  }, token: String) {
    console.log('API-PROVIDER', 'create contact');
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    return this.http.post (
      `${BASE_URL}${CONTACTS}`,
      contact,
      {headers: headers}
    );
  }

  updateContact(id: String, contact: {
    "phone": String,
    "firstName": String,
    "lastName": String,
    "email": String,
    "profile": String,
    "gravatar" : String,
    "isFamilinkUser" : Boolean,
    "isEmergencyUser": Boolean
  }, token: String) {
    console.log('API-PROVIDER', 'update contact');
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    return this.http.put (
      `${BASE_URL}${CONTACTS}${id}`,
      contact,
      {headers: headers}
    );
  }

  deleteContact(id: String, token: String) {
    console.log('API-PROVIDER', 'delete contact');
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    return this.http.delete (
      `${BASE_URL}${CONTACTS}${id}`,
      {headers: headers}
    );
  }

}
