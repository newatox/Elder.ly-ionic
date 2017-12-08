import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  signupForm: FormGroup;
  formSubmitted = false;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder, private auth: AuthProvider) {
    this.signupForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{4,}$')])],
      profile: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  openLoginPage() {
    this.navCtrl.pop().then();
  }

  doSignup() {
    this.formSubmitted = true;

    if (this.signupForm.valid) {
      this.auth.signup({ phone: this.signupForm.value.phone,
        password: this.signupForm.value.password,
        firstName: this.signupForm.value.firstname,
        lastName: this.signupForm.value.lastname,
        email: this.signupForm.value.email,
        profile: this.signupForm.value.profile })
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
