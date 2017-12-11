import { Component } from '@angular/core';
import { ActionSheetController, IonicPage,
  NavController, Platform } from 'ionic-angular';
import { AddEditContactPage } from '../add-edit-contact/add-edit-contact';
import Contact from '../../models/Contact';
import { TranslateService } from '@ngx-translate/core';

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
  public favoriteButtonLabel: String = 'ADD_TO_FAVORITES'; // TODO - Load label according to contact

  private optionsLabel = 'OPTIONS_LABEL';
  private modifyLabel = 'MODIFY_LABEL';
  private deleteLabel = 'DELETE_LABEL';
  private cancelLabel = 'CANCEL_LABEL';

  constructor(public navCtrl: NavController,
              public alertCtrl: ActionSheetController,
              public platform: Platform,
              translate: TranslateService) {
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
    /**
     * We modify the labels in the code, with translate.get()
     */
    translate.get(this.optionsLabel).subscribe(
      (translation) => {
        this.optionsLabel = translation;
      });
    translate.get(this.modifyLabel).subscribe(
      (translation) => {
        this.modifyLabel = translation;
      });
    translate.get(this.deleteLabel).subscribe(
      (translation) => {
        this.deleteLabel = translation;
      });
    translate.get(this.cancelLabel).subscribe(
      (translation) => {
        this.cancelLabel = translation;
      });
  }

  present() {
    const actionSheet = this.alertCtrl.create({
      title: this.optionsLabel,
      buttons: [
        {
          text: this.deleteLabel,
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: this.modifyLabel,
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push(AddEditContactPage).then();
          },
        },
        {
          text: this.cancelLabel,
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
      this.favoriteButtonLabel = 'REMOVE_FROM_FAVORITES';
    } else {
      this.favoriteButtonLabel = 'ADD_TO_FAVORITES';
    }
  }

  segmentButtonSelected(event) {
    const interaction = event.value;
    console.log(interaction);
  }
}
