import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AddEditContactPage} from "../add-edit-contact/add-edit-contact";

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
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: ActionSheetController, public platform: Platform) {
    this.selectedItem = navParams.get('item');
  }

  present() {
    let actionSheet = this.alertCtrl.create({
      title: 'Albums',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push(AddEditContactPage).then();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present().then();
  }
}
