import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

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

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private auth: AuthProvider) {
    this.addEditForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      profile: ['', Validators.compose([Validators.required])],
    });

    this.auth.getProfiles()
      .then((profiles) => {
        this.profiles = profiles;
        this.addEditForm.get('profile').setValue(profiles[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addEditContact() {
    if (this.isEditMode) this.editContact();
    else this.addContact();
  }
  editContact() {

  }
  addContact() {
    
  }
}
