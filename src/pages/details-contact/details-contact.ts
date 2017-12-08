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
  public favoriteButtonLabel: String = 'Ajouter à mes favoris';

  constructor(public navCtrl: NavController,
              public alertCtrl: ActionSheetController, public platform: Platform) {
    // const gravURL = 'https://adriendeneu.files.wordpress.com/2008/10/panorama-vertical.jpg?w=267&h=1024';
    const gravURL = 'https://www.shareicon.net/download/2016/07/05/791214_man_512x512.png';
    this.contact = new Contact(
      '0600000042',
      'Jean-Patrick',
      'Dupont',
      'aaaa@aaa.com',
      'SENIOR',
      '',
      '' + gravURL,
    );
  }

  present() {
    const actionSheet = this.alertCtrl.create({
      title: 'Options',
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

  favoriteButtonClicked() {
    this.contact.isFavorite = !this.contact.isFavorite;
    if (this.contact.isFavorite) {
      this.favoriteButtonLabel = 'Retirer de mes favoris';
    } else {
      this.favoriteButtonLabel = 'Ajouter à mes favoris';
    }
  }

  segmentButtonSelected(event) {
    const interaction = event.value;
    console.log(interaction);
  }
}
