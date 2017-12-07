import { Component } from '@angular/core';
import { ActionSheetController, IonicPage,
  NavController, Platform } from 'ionic-angular';
import { AddEditContactPage } from '../add-edit-contact/add-edit-contact';
import Contact from '../../models/Contact';

/**
 * Generated class for the DetailsContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-contact',
  templateUrl: 'details-contact.html',
})
export class DetailsContactPage {
  public contact: Contact;

  constructor(public navCtrl: NavController,
              public alertCtrl: ActionSheetController, public platform: Platform) {
    this.contact = new Contact(
      '0600000042',
      'Jean-Patrick',
      'Dupont',
      'aaaa@aaa.com',
      'SENIOR',
      false,
      false,
      false,
      0,
      '',
      'https://www.shareicon.net/download/2016/07/05/791214_man_512x512.png',
    );
  }

  present() {
    const actionSheet = this.alertCtrl.create({
      title: 'Albums',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push(AddEditContactPage).then();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    actionSheet.present().then();
  }
}
