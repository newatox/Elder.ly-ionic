import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddEditContactPage } from '../add-edit-contact/add-edit-contact';
import Contact from '../../models/Contact';
import { ContactsProvider } from '../../providers/contacts/contacts';
import { DetailsContactPage } from '../details-contact/details-contact';

@Component({
  selector: 'page-list',
  templateUrl: 'list-contacts.html',
})
export class ListContactsPage {
  isLogged: boolean = false;
  displayedList: Contact[] = [];
  contacts: Contact[] = [];
  favorites: Contact[] = [];
  frequents: Contact[] = [];
  root = DetailsContactPage;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
              public contactProvider: ContactsProvider) {
  }

  ionViewDidLoad() {
    if (!this.isLogged) {
      const loginModal = this.modalCtrl.create(LoginPage);
      loginModal.present().then(() => { console.log('login opened'); });
    }
  }

  ionViewDidEnter() {
    this.contactProvider.all()
      .then((result) => {
        this.contacts = result;
        this.displayAllContacts();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openAddEdit() {
    this.navCtrl.push(AddEditContactPage).then();
  }

  displayFavorites() {
    this.favorites = [];
    this.contacts.map((contact) => { if (contact.isFavorite) this.favorites.push(contact); });
    this.displayedList = this.favorites;
  }
  displayFrequent() {
    this.frequents = [];
    this.contacts.sort((a, b) => b.frequency - a.frequency);
    this.contacts.map((contact) => {
      if (contact.frequency > 0 && this.frequents.length < 5) this.frequents.push(contact);
    });
    this.displayedList = this.frequents;
  }
  displayAllContacts() {
    this.contacts.sort((a, b) => { return a.firstName.localeCompare(b.firstName); });
    this.displayedList = this.contacts;
  }

}
