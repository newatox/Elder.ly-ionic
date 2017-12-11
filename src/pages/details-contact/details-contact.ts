import { Component } from '@angular/core';
import {
  ActionSheetController,
  IonicPage,
  NavController,
  NavParams,
  Platform,
} from 'ionic-angular';
import { AddEditContactPage } from '../add-edit-contact/add-edit-contact';
import Contact from '../../models/Contact';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { EmailComposer } from '@ionic-native/email-composer';
import { ContactsProvider } from '../../providers/contacts/contacts';

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
  private helloString = 'HELLO';
  private greetingString = 'GREETING_MESSAGE';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: ActionSheetController,
              public platform: Platform,
              public contactsProvider: ContactsProvider,
              public translate: TranslateService,
              private callNumber: CallNumber,
              private sms: SMS,
              private emailComposer: EmailComposer,
              ) {


    this.contact = navParams.get('contact');
    console.log('Contact affected : ', this.contact);

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
    translate.get('HELLO').subscribe(
      (translation) => {
        this.helloString = translation;
      });
    translate.get('GREETING_MESSAGE').subscribe(
      (translation) => {
        this.greetingString = translation;
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
            this.deleteContact();
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

  deleteContact() {
    this.contactsProvider.delete(this.contact.wsId);
    this.navCtrl.pop();
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
    console.log('Interaction : ', interaction);
    const message = this.helloString + this.contact.firstName + this.greetingString;

    switch (interaction) {
      case 'Calling':
        this.callNumber.callNumber(this.contact.phone, true)
          .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer'));
        break;
      case 'Texting':
        const options = {
          replaceLineBreaks: true, // true to replace \n by a new line
          android: {
            intent: 'INTENT',
          },
        };
        this.sms.send(this.contact.phone, message, options);
        break;
      case 'Emailing':
        const body = message;
        const email = {
          body,
          to: this.contact.email,
          subject: 'Nouvelles',
          isHtml: true,
        };
        this.emailComposer.open(email);
        break;
      default:
        break;
    }
  }
}
