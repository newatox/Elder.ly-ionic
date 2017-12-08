import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddEditContactPage } from '../add-edit-contact/add-edit-contact';
import Contact from '../../models/Contact';
import { DetailsContactPage } from '../details-contact/details-contact';

@Component({
  selector: 'page-list',
  templateUrl: 'list-contacts.html',
})
export class ListContactsPage {
  contacts: any;
  isLogged: boolean = false;
  root = DetailsContactPage;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.contacts = [];
    for (let i = 1; i < 11; i = i + 1) this.contacts.push(new Contact(
      '0600000042', 'Jean-Patrick', 'Dupont', 'SENIOR', 'aaaa@aaa.com',
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
