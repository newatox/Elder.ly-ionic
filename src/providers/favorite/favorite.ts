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

  toggleLocalFavoriteStatus(newFavorite: Contact) {
    return new Promise((resolve, reject) => {
      let isNewFavorite = true;
      this.storage.get('user')
        .then((user) => {
          const key = 'favorites' + user.phone;
          this.storage.get(key)
            .then((localFavorites) => {
              console.log('Favorites from local storage = ', localFavorites);
              let favorites = [];
              if (localFavorites == null) {
                favorites.push(newFavorite.wsId);
              } else {
                favorites = [...localFavorites];
                const index = localFavorites.findIndex(id => id === newFavorite.wsId);
                if (index === -1) {
                  favorites.push(newFavorite.wsId);
                } else {
                  isNewFavorite = false;
                  favorites = favorites.filter(id => id !== newFavorite.wsId);
                }
              }
              this.storage.set(key, favorites)
                .then(() => {
                  resolve(isNewFavorite);
                })
                .catch(() => {
                  reject();
                });
            });
        });
    });
  }

  increaseFrequentStatus(contactWithInteraction: Contact, increment: number) {
    return new Promise((resolve, reject) => {
      let frequency = increment; // If no interaction before
      this.storage.get('user')
        .then((user) => {
          const key = 'frequency' + user.phone;
          this.storage.get(key)
            .then((localFrequentContacts) => {
              console.log('Favorites from local storage = ', localFrequentContacts);
              let frequentContacts = [];
              if (localFrequentContacts == null) {
                frequentContacts.push({ id: contactWithInteraction.wsId, frequency: increment });
              } else {
                frequentContacts = [...localFrequentContacts];
                const index = localFrequentContacts.findIndex((freqContact) => {
                  return freqContact.id === contactWithInteraction.wsId;
                });
                if (index === -1) {
                  frequentContacts.push({ id: contactWithInteraction.wsId, frequency: increment });
                } else {
                  frequency = frequentContacts[index].frequency + increment;
                  frequentContacts[index].frequency = frequency;
                }
              }
              this.storage.set(key, frequentContacts)
                .then(() => {
                  resolve(frequency);
                })
                .catch(() => {
                  reject();
                });
            });
        });
    });
  }

  isLocalFavorite(contact: Contact) {
    return new Promise((resolve) => {
      this.storage.get('user').then((user) => {
        this.storage.get('favorites' + user.phone).then((localFavorites) => {
          if (localFavorites == null) {
            resolve(false);
          } else {
            const isFav = localFavorites.findIndex(id => id === contact.wsId) >= 0;
            resolve(isFav);
          }
        });
      });
    });
  }
}
