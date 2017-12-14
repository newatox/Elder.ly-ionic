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

  public toggleLocalFavoriteStatus(newFavorite: Contact) {
    /**
     * Updates local data.
     * - If given contact was not stored as favorite, stores it as favorite.
     * - If already stored, removes it from favorites.
     * - Also handles case when no favorite existed before.
     * Key for local storage includes phone number :
     *  > Avoids collisions between different users and their respective favorites.
     */
    return new Promise((resolve, reject) => {
      if ((newFavorite === null) || (newFavorite === undefined)) {
        reject();
      } else {
        let isNewFavorite = true;
        let key;
        this.storage.get('user')
          .then((user) => {
            key = 'favorites' + user.phone;
            return this.storage.get(key);
          })
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
            return this.storage.set(key, favorites);
          })
          .then(() => {
            resolve(isNewFavorite);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  public increaseFrequentStatus(contactWithInteraction: Contact, increment: number) {
    /**
     * Updates local data.
     * - If given contact was not stored as frequent, stores it as frequent.
     * - If already stored, updates its frequency.
     * - Also handles case when no frequent contact existed before.
     * Param : how much to increment contact's frequency.
     * Key for local storage includes phone number :
     *  > Avoids collisions between different users and their respective favorites.
     */
    return new Promise((resolve, reject) => {
      if ((contactWithInteraction === null) || (contactWithInteraction === undefined)) {
        reject('Null or undefined contact');
      } else {
        let frequency = increment; // True if no interaction before
        let key;
        this.storage.get('user')
          .then((user) => {
            key = 'frequents' + user.phone;
            return this.storage.get(key);
          })
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
              frequentContacts.sort((a, b) => b.frequency - a.frequency);
            }
            return this.storage.set(key, frequentContacts);
          })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  public isLocalFavorite(contact: Contact) {
    /**
     * Returns promise with boolean, whether contact is stored locally as favorite.
     */
    return new Promise((resolve, reject) => {
      this.storage.get('user')
        .then((user) => {
          return this.storage.get('favorites' + user.phone);
        })
        .then((localFavorites) => {
          if (localFavorites == null) {
            resolve(false);
          } else {
            const isFav = localFavorites.findIndex(id => id === contact.wsId) >= 0;
            resolve(isFav);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public getMostFrequentContacts() {
    /**
     * Returns promise with list of most frequent contacts.
     * List is truncated to 5 most frequent if applicable.
     */
    return new Promise((resolve, reject) => {
      this.storage.get('user')
        .then((user) => {
          return this.storage.get('frequents' + user.phone);
        })
        .then((frequents) => {
          if (frequents === null || frequents === undefined)
            resolve(null);
          if (frequents.length <= 5) {
            resolve(frequents);
          } else {
            resolve(frequents.slice(0, 4));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public clearFrequentAndFavoriteLocalData(idList: string[]) {
    /**
     * Called at list displaying.
     * Useful if a previous contact does not exist anymore (has been deleted).
     *  > In case it was a favorite or frequent contact, should be deleted from local storage.
     * Param: List of contact IDs.
     */
    this.clearFavorites(idList);
    this.clearFrequents(idList);
    console.log('Deleted previous frequent and favorite users that do not exist now');
  }

  private clearFavorites(idList: string[]) {
    let key;
    this.storage.get('user')
      .then((user) => {
        key = 'favorites' + user.phone;
        return this.storage.get(key);
      })
      .then((storedFavorites) => {
        console.log('Clearing favorites', storedFavorites);
        if ((storedFavorites === null) || (storedFavorites === undefined)) {
          console.log('No favorite contact => nothing to clear');
          return;
        }
        let favorites;
        favorites = storedFavorites.filter((favorite) => {
          return (idList.findIndex(favorite) >= 0);
        });
        return this.storage.set(key, favorites);
      })
      .catch((error) => {
        console.log('No favorite ? ', error);
      });
  }

  private clearFrequents(idList: string[]) {
    let key;
    this.storage.get('user')
      .then((user) => {
        key = 'frequents' + user.phone;
        return this.storage.get(key);
      })
      .then((storedFrequents) => {
        if ((storedFrequents === null) || (storedFrequents === undefined)) {
          console.log('No frequent contact => nothing to clear');
          return;
        }
        console.log('Clearing frequents', storedFrequents);
        let frequents;
        frequents = storedFrequents.filter((frequentObject) => {
          return (idList.findIndex(frequentObject.id) >= 0);
        });
        return this.storage.set(key, frequents);
      })
      .catch((error) => {
        console.log('No frequent ? ', error);
      });
  }
}
