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
  pageTitle: String;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private auth: AuthProvider,
              private contactsProvider: ContactsProvider,
              public navParams: NavParams) {

    this.pageTitle = 'ADD_PAGE_NAME';

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
          this.pageTitle = 'EDIT_PAGE_NAME';
          this.isEditMode = true;
          this.addEditForm.setValue({phone: this.contactEdit.phone,
            firstName: this.contactEdit.firstName,
            lastName: this.contactEdit.lastName,
            email: this.contactEdit.email,
            profile: this.contactEdit.profile });
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
      this.contactEdit.phone = this.addEditForm.value.phone;
      this.contactEdit.firstName = this.addEditForm.value.firstName;
      this.contactEdit.lastName = this.addEditForm.value.lastName;
      this.contactEdit.email = this.addEditForm.value.email;
      this.contactEdit.profile = this.addEditForm.value.profile;
      this.contactEdit.setGravatar(); // update gravatar
      this.contactsProvider.update(this.contactEdit.wsId, this.contactEdit)
        .then((result) => {
          console.log('RESULT', result);
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
      const newContact = new Contact(
        this.addEditForm.value.phone,
        this.addEditForm.value.firstName,
        this.addEditForm.value.lastName,
        this.addEditForm.value.email,
        this.addEditForm.value.profile,
      );
      newContact.setGravatar();
      this.contactsProvider.create(newContact)
        .then((contact) => {
          console.log('CONTACT ADDED', contact);
          this.navCtrl.pop().then();
        })
        .catch((httpErrorResponse) => {
          console.log('ERROR', httpErrorResponse.error.message);
          alert(httpErrorResponse.error.message);
        });
    }
  }
}
