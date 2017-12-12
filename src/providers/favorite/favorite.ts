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

  addToFavorites(newFavorite: Contact) {
    const contacts = this.storage.get('contacts');
    console.log('Contacts = ', contacts);
  }

}
