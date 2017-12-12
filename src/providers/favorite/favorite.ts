import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Contact from '../../models/Contact';
import { Storage } from '@ionic/storage';


/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  constructor(public http: HttpClient,
              public storage: Storage,
              ) {
    console.log('Hello FavoriteProvider Provider');
  }

  updateFavoriteStatus(newFavorite: Contact) {
    this.storage.get('contacts')
      .then((contacts) => {
        console.log('Contacts from local storage = ', contacts);
        const newFavIndex = contacts.findIndex(contact => contact.wsId === newFavorite.wsId);
        if (newFavIndex >= 0 && contacts[newFavIndex].isFavorite === newFavorite.isFavorite) {
          contacts[newFavIndex].isFavorite = !newFavorite.isFavorite;
          console.log('Contacts before setting storage = ', contacts);
          this.storage.set('contacts', [...contacts]);
          return this.storage.get('contacts');
        }
      })
      .then((storageContacts) => {
        console.log('Contacts now in storage = ', storageContacts);
      });
  }

}
