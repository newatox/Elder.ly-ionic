import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsContactPage } from '../../pages/details-contact/details-contact';
import Contact from '../../models/Contact';

/**
 * Generated class for the ContactCellComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contact-cell',
  templateUrl: 'contact-cell.html',
})
export class ContactCellComponent {
  @Input()
  contact: Contact;

  constructor(public navCtrl: NavController) {
  }

  navigateToDetails() {
    this.navCtrl.push(DetailsContactPage, { contact: this.contact }).then();
  }

  callContact() {
    // TODO
  }
}
