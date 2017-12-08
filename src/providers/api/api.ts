import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Contact from '../../models/Contact';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const BASE_URL = 'http://familink.cleverapps.io/';

// PUBLIC
const LOGIN = 'public/login';
const SIGNUP = 'public/sign-in?contactsLength=0';
const PROFILES = 'public/profiles';
const FORGOTTEN_PASSWORD = 'public/forgot-password';

// PRIVATE
const CURRENT_AUTH = 'secured/users/current';
const CONTACTS = 'secured/users/contacts/';

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

  signup(
    body: {
      phone: String,
      password: String,
      firstName: String,
      lastName: String,
      email: String,
      profile: String, // SENIOR, FAMILLE, MEDECIN
    }) {
    console.log('API-PROVIDER', 'signup');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${BASE_URL}${SIGNUP}`, body,{ headers });
  }

  getProfiles() {
    console.log('API-PROVIDER', 'profiles');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${BASE_URL}${PROFILES}`, { headers });
  }

  forgottenPassword(body: {phone: String}) {
    console.log('API-PROVIDER', 'forgottenPassword');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${BASE_URL}${FORGOTTEN_PASSWORD}`, body,{ headers });
  }

  // Current User HTTP Requests
  currentAuth(token: String) {
    console.log('API-PROVIDER', 'currentAuth');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    return this.http.get(`${BASE_URL}${CURRENT_AUTH}`, { headers });
  }

  // Contacts HTTP Requests
  getAllContacts(token: String) {
    console.log('API-PROVIDER', 'contacts');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    return this.http.get (`${BASE_URL}${CONTACTS}`,{ headers });
  }

  createContact(contact: Contact, token: String) {
    console.log('API-PROVIDER', 'create contact');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    return this.http.post (
      `${BASE_URL}${CONTACTS}`,
      contact,
      { headers },
    );
  }

  updateContact(id: String, contact: Contact, token: String) {
    console.log('API-PROVIDER', 'update contact');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    return this.http.put (
      `${BASE_URL}${CONTACTS}${id}`,
      contact,
      { headers },
    );
  }

  deleteContact(id: String, token: String) {
    console.log('API-PROVIDER', 'delete contact');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    return this.http.delete (
      `${BASE_URL}${CONTACTS}${id}`,
      { headers },
    );
  }

}
