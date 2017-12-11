import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  remember: boolean;
  loginForm: FormGroup;
  formSubmitted = false;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController,
              private formBuilder: FormBuilder, private auth: AuthProvider) {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{4,}$')])],
      remember: [false],
    });
  }

  ionViewDidLoad() {
    // this.viewCtrl.dismiss().then(); // TODO - Remove (useful for test only)
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    console.log('Phone : ' + this.loginForm.value.phone);
    console.log('Password : ' + this.loginForm.value.password);

    this.formSubmitted = true;

    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value.phone, this.loginForm.value.password)
        .then((token) => {
          console.log('RESULT', token);

          if (this.loginForm.value.remember) {

          }

          this.viewCtrl.dismiss().then();
        })
        .catch((httpErrorResponse) => {
          console.log('ERROR', httpErrorResponse.error.message);
          alert(httpErrorResponse.error.message);
        });
    }
  }

  openSignUpPage() {
    this.navCtrl.push(SignUpPage).then();
  }

  forgottenPasswordAlert(error = false) {
    const phoneRegex = /^[0-9]{10}$/;
    const phone = prompt('Please enter your phone number',
                         (error ? 'Invalid number' : (phoneRegex.test(this.loginForm.value.phone)
                          ? this.loginForm.value.phone : '')));

    if (phone === null) {
      return;
    }

    if (phoneRegex.test(phone)) {
      // TODO WS call
      alert('Your password has been sent');
    } else {
      this.forgottenPasswordAlert(true);
    }
  }

}
