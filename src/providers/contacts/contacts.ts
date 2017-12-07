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
  private token: String;

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
        console.log('CONTACTS', contacts);
        this.contacts = (contacts as any[]).map((contact) => {
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
