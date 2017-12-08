import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddEditContactPage } from '../add-edit-contact/add-edit-contact';
import Contact from '../../models/Contact';
import { DetailsContactPage } from '../details-contact/details-contact';
import {ContactsProvider} from "../../providers/contacts/contacts";

@Component({
  selector: 'page-list',
  templateUrl: 'list-contacts.html',
})
export class ListContactsPage {
  isLogged: boolean = false;
  root = DetailsContactPage;
  contacts: Contact[] = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
              public contactProvider: ContactsProvider) {
  }

  ionViewDidLoad() {
    if (!this.isLogged) {
      const loginModal = this.modalCtrl.create(LoginPage);
      loginModal.present().then(() => { console.log('login opened'); });
    }
    this.contactProvider.all()
      .then((result) => {
        this.contacts = result;
      });

  }

  openAddEdit() {
    this.navCtrl.push(AddEditContactPage).then();
  }
}
