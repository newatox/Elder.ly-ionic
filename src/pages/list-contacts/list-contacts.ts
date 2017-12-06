import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DetailsContactPage } from '../details-contact/details-contact';
import { AddEditContactPage } from '../add-edit-contact/add-edit-contact';

@Component({
  selector: 'page-list',
  templateUrl: 'list-contacts.html',
})
export class ListContactsPage {
  icons: string[];
  items: any;
  isLogged: boolean = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i = i + 1) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
      });
    }
  }

  ionViewDidLoad() {
    if (!this.isLogged) {
      const loginModal = this.modalCtrl.create(LoginPage);
      loginModal.present().then(() => { console.log('login opened'); });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(DetailsContactPage,  { item }).then();
  }

  openAddEdit() {
    this.navCtrl.push(AddEditContactPage).then();
  }
}
