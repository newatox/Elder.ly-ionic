import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddEditContactPage } from '../add-edit-contact/add-edit-contact';
import Contact from '../../models/Contact';

@Component({
  selector: 'page-list',
  templateUrl: 'list-contacts.html',
})
export class ListContactsPage {
  contacts: any;
  isLogged: boolean = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.contacts = [];
    for (let i = 1; i < 6; i = i + 1) this.contacts.push(new Contact(
      {
        phone: '0600000042', firstName: 'Jean-Patrick', lastName: 'Dupont',
        email: 'aaa@aaa', profile: 'Senior',
      },
    ));
  }

  ionViewDidLoad() {
    if (!this.isLogged) {
      const loginModal = this.modalCtrl.create(LoginPage);
      loginModal.present().then(() => { console.log('login opened'); });
    }
  }

  openAddEdit() {
    this.navCtrl.push(AddEditContactPage).then();
  }
}
