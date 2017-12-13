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
      if ((newFavorite === null) || (newFavorite === undefined)) {
        reject();
      } else {
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
      }
    });
  }

  increaseFrequentStatus(contactWithInteraction: Contact, increment: number) {
    return new Promise((resolve, reject) => {
      if ((contactWithInteraction === null) || (contactWithInteraction === undefined)) {
        reject();
      } else {
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
                    frequentContacts.push(
                      { id: contactWithInteraction.wsId, frequency: increment });
                  } else {
                    frequency = frequentContacts[index].frequency + increment;
                    frequentContacts[index].frequency = frequency;
                  }
                  frequentContacts.sort((a,b) =>  b.frequency - a.frequency);
                }
                this.storage.set(key, frequentContacts)
                  .then(() => {
                    resolve();
                  })
                  .catch(() => {
                    reject();
                  });
              });
          });
      }
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

  getMostFrequentContacts() {
    return new Promise((resolve) => {
      this.storage.get('user').then((user) => {
        this.storage.get('frequents' + user.phone).then((frequents) => {
          if (frequents.length <= 5) {
            resolve(frequents);
          } else {
            resolve(frequents.slice(0, 4));
          }
        });
      });
    });
  }

  private clearFavorites(idList: string[]) {
    return new Promise((resolve, reject) => {
      this.storage.get('user').then((user) => {
        let favorites = [];
        const key = 'favorites' + user.phone;
        this.storage.get(key).then((storedFavorites) => {
          favorites = storedFavorites.filter((favorite) => {
            return idList.findIndex(favorite) >= 0;
          });
          this.storage.set(key, favorites)
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        });
      });
    });
  }

  private clearFrequents(idList: string[]) {
    return new Promise((resolve, reject) => {
      this.storage.get('user').then((user) => {
        let frequents = [];
        const key = 'frequents' + user.phone;
        this.storage.get(key).then((storedFrequents) => {
          frequents = storedFrequents.filter((frequent) => {
            return idList.findIndex(frequent) >= 0;
          });
          this.storage.set(key, frequents)
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        });
      });
    });
  }

  public clearFrequentAndFavoriteLocalData(idList: string[]) {
    /**
     * Called at list displaying.
     * Useful if a contact has been deleted.
     * Param: List of contact IDs.
     */
    this.clearFavorites(idList);
    this.clearFrequents(idList);
  }
}
