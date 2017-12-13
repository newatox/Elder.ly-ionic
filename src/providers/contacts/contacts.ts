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

        // set local array of contact
        this.contacts = (contacts as any[]).map((contact) => {
          return new Contact(
            contact.phone,
            contact.firstName,
            contact.lastName,
            contact.email,
            contact.profile,
            contact._id,
            contact.gravatar,
            contact.isFamilinkuser,
            contact.isEmergencyUser,
            contact.isFavorite,
            contact.frequency,
          );
        });

        // Set contacts localy
        console.log('SET LOCAL CONTACTS');
        return this.storage.set('contacts', [...this.contacts]);
      })
      .catch((error) => {
        // Get contact from API failed
        console.log('API ERROR', error.message);
      })
      .then(() => {
        // No matter what happened before get contacts from local storage
        console.log('GET LOCAL CONTACTS');
        return this.storage.get('contacts');
      })
      .then((localContacts) => {
        // Return array of Contacts from local array of objects
        this.contacts = [];
        if (localContacts != null && localContacts !== undefined) {
          this.contacts = localContacts.map((contact) => {
            return new Contact(
              contact.phone,
              contact.firstName,
              contact.lastName,
              contact.email,
              contact.profile,
              contact.wsId,
              contact.gravatar,
              contact.isFamilinkuser,
              contact.isEmergencyUser,
              contact.isFavorite,
              contact.frequency,
            );
          });
        }
        console.log('RETURN LOCAL CONTACTS', this.contacts);
        return [...this.contacts];
      });
  }



  create(contact: Contact) {
    return this.storage.get('token')
      .then((token) => {
        console.log('TOKEN', token) ;
        return this.api.createContact(contact, token).toPromise();
      })
      .then((result) => {
        const newContact = new Contact(
          result['phone'],
          result['firstName'],
          result['lastName'],
          result['email'],
          result['profile'],
          result['_id']);
        this.contacts.push(newContact);
        this.storage.set('contacts', this.contacts); // Save localy
        return newContact;
      });
  }

  update(id, contact) {
    return this.storage.get('token')
      .then((token) => {
        console.log('TOKEN', token) ;
        return this.api.updateContact(id, contact, token).toPromise()
          .then((result) => { return result; });
      });
  }

  delete(id) {
    return this.storage.get('token')
      .then((token) => {
        console.log('TOKEN', token) ;
        return this.api.deleteContact(id, token).toPromise()
          .then((result) => { return result; });
      });
  }

}
