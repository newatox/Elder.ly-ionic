import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController, Events,
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
import { AuthProvider } from '../../providers/auth/auth';
import { FavoriteProvider } from '../../providers/favorite/favorite';

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
  public favoriteButtonLabel: String = 'ADD_TO_FAVORITES';
  public isFavorite: boolean;
  isLogged: boolean = false;

  private optionsLabel = 'OPTIONS_LABEL';
  private modifyLabel = 'MODIFY_LABEL';
  private deleteLabel = 'DELETE_LABEL';
  private cancelLabel = 'CANCEL_LABEL';
  private helloString = 'HELLO';
  private greetingString = 'GREETING_MESSAGE';
  private emailSubjectString = 'EMAIL_SUBJECT';
  private deleteConfirmString = 'DELETE_CONFIRM';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: ActionSheetController,
              public platform: Platform,
              public contactsProvider: ContactsProvider,
              public translate: TranslateService,
              private callNumber: CallNumber,
              private sms: SMS,
              private emailComposer: EmailComposer,
              private delAlertCtrl: AlertController,
              public auth: AuthProvider,
              public favProvider: FavoriteProvider,
              public events: Events) {

    // Get contact sent by list
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
    translate.get(this.deleteConfirmString).subscribe(
      (translation) => {
        this.deleteConfirmString = translation;
      });
    translate.get(this.emailSubjectString).subscribe(
      (translation) => {
        this.emailSubjectString = translation;
      });
    translate.get(this.helloString).subscribe(
      (translation) => {
        this.helloString = translation;
      });
    translate.get(this.greetingString).subscribe(
      (translation) => {
        this.greetingString = translation;
      });

    // Subscribe to the login event
    this.events.subscribe('auth:login', () => { this.isLogged = true; });
  }

  ionViewDidLoad() {
    if (this.isLogged) {
      this.favProvider.isLocalFavorite(this.contact)
        .then((isFav: boolean) => {
          this.isFavorite = isFav;
          if (isFav) {
            this.favoriteButtonLabel = 'REMOVE_FROM_FAVORITES';
          } else {
            this.favoriteButtonLabel = 'ADD_TO_FAVORITES';
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
            this.navCtrl.push(AddEditContactPage,{ contact: this.contact }).then();
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
    const delAlert = this.delAlertCtrl.create({
      title: this.deleteLabel,
      message : this.deleteConfirmString,
      buttons: [
        {
          text: this.cancelLabel,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.deleteLabel,
          handler: () => {
            console.log('Confirm clicked');
            this.contactsProvider.delete(this.contact.wsId).then(
              () => {
                this.navCtrl.pop();
              },
              (error) => {
                console.log(error);
                this.auth.invalidToken();
              });
          },
        },
      ],
    });
    delAlert.present();
  }

  favoriteButtonClicked() {
    this.favProvider.toggleLocalFavoriteStatus(this.contact)
      .then((isNewFavorite: boolean) => {
        if (isNewFavorite) {
          this.isFavorite = true;
          this.favoriteButtonLabel = 'REMOVE_FROM_FAVORITES';
        } else {
          this.isFavorite = false;
          this.favoriteButtonLabel = 'ADD_TO_FAVORITES';
        }
      })
      .catch(() => {
        console.log('favButtonClicked error');
      });
  }

  segmentButtonSelected(event) {
    const interaction = event.value;
    console.log('Interaction : ', interaction);
    const message = this.helloString + this.contact.firstName + this.greetingString;

    switch (interaction) {
      case 'Calling':
        this.favProvider.increaseFrequentStatus(this.contact,2).then(() => {

        });
        this.callNumber.callNumber(this.contact.phone, true)
          .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer'));
        break;
      case 'Texting':
        this.favProvider.increaseFrequentStatus(this.contact,1).then(() => {
          console.log(interaction, ', frequency updated');
        });
        const options = {
          replaceLineBreaks: true, // true : replaces \n by a new line
          android: {
            intent: 'INTENT',
          },
        };
        this.sms.send(this.contact.phone, message, options);
        break;
      case 'Emailing':
        this.favProvider.increaseFrequentStatus(this.contact,1).then(() => {
          console.log(interaction, ', frequency updated');
        });
        const body = message;
        const email = {
          body,
          to: this.contact.email,
          subject: this.emailSubjectString,
          isHtml: true,
        };
        this.emailComposer.open(email);
        break;
      default:
        break;
    }
  }
}
