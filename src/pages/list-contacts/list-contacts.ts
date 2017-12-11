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
        this.displayedList = this.contacts;
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
    this.contacts.map((contact) => { if(contact.isFavorite) this.favorites.push(contact); });
    console.log(this.favorites.length);
    this.displayedList = this.favorites;
  }
  displayFrequent() {
    // TODO
  }
  displayAllContacts() {
    this.displayedList = this.contacts;
  }

}
