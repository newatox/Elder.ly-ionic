import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Contact from '../../models/Contact';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../api/api';

/*
  Generated class for the ContactsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactsProvider {

  private contacts: Contact[] = [];

  constructor(public http: HttpClient, public api: ApiProvider, public storage: Storage) {
    console.log('Hello ContactsProvider Provider');
  }

  all(): Promise<any> {
    return this.storage.get('token')
      .then((token) => {
        console.log('TOKEN', token) ;
        return this.api.getAllContacts(token).toPromise();
      })
      .then((contacts) => {
        // Get contact from API succeed
        console.log('API OBJECTS CONTACTS', contacts);
        // Set contacts localy
        console.log('SET LOCAL CONTACTS');
        return this.storage.set('contacts', contacts);
      })
      .catch((error) => {
        // Get contact from API failed
        console.log('API ERROR', error);
      })
      .then(() => {
        // No matter what happened before get contacts from local storage
        console.log('GET LOCAL CONTACTS');
        return this.storage.get('contacts');
      })
      .then((localContacts) => {
        // Return array of Contacts from local array of objects
        this.contacts = localContacts.map((contact) => {
          return new Contact(
            contact.phone,
            contact.firstName,
            contact.lastName,
            contact.email,
            contact.profile,
            contact.isFamilinkuser,
            contact.isEmergencyUser,
            contact.isFavorite,
            contact.frequency,
            contact.wsId,
            contact.gravatar,
          );
        });
        console.log('RETURN LOCAL CONTACTS');
        return [...this.contacts];
      });
  }



  create() {

  }

  update() {

  }

  delete() {

  }

}
