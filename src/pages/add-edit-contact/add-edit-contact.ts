import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ContactsProvider } from '../../providers/contacts/contacts';
import Contact from '../../models/Contact';

/**
 * Generated class for the AddEditContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-contact',
  templateUrl: 'add-edit-contact.html',
})
export class AddEditContactPage {
  addEditForm: FormGroup;
  formSubmitted = false;
  profiles = [];
  isEditMode = false;
  contactEdit: Contact;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private auth: AuthProvider,
              private contactsProvider: ContactsProvider,
              public navParams: NavParams) {
    this.addEditForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      profile: ['', Validators.compose([Validators.required])],
    });

    this.auth.getProfiles()
      .then((profiles) => {
        this.profiles = profiles;
        this.addEditForm.get('profile').setValue(profiles[0]);
        if (this.contactEdit = navParams.get('contact')) {
          this.isEditMode = true;
          this.addEditForm.get('profile').setValue(this.contactEdit.profile);
        } else {
          this.addEditForm.get('profile').setValue('FAMILLE');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addEditContact() {
    this.formSubmitted = true;
    if (this.isEditMode) this.editContact();
    else this.addContact();
  }
  editContact() {
    if (this.addEditForm.valid) {
      this.contactsProvider.update(this.contactEdit.wsId, this.contactEdit)
        .then((token) => {
          console.log('RESULT', token);
          this.navCtrl.pop().then();
        })
        .catch((httpErrorResponse) => {
          console.log('ERROR', httpErrorResponse.error.message);
          alert(httpErrorResponse.error.message);
        });
    }
  }
  addContact() {
    if (this.addEditForm.valid) {
      this.contactsProvider.create(new Contact(
        this.addEditForm.value.phone,
        this.addEditForm.value.firstName,
        this.addEditForm.value.lastName,
        this.addEditForm.value.email,
        this.addEditForm.value.profile))
        .then((token) => {
          console.log('RESULT', token);
          this.navCtrl.pop().then();
        })
        .catch((httpErrorResponse) => {
          console.log('ERROR', httpErrorResponse.error.message);
          alert(httpErrorResponse.error.message);
        });
    }
  }
}
