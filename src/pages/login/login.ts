import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';

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


  constructor(public viewCtrl: ViewController, public navCtrl: NavController,
              private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.pattern('^[0-9]{10}$'), Validators.required])],
      password: ['', Validators.compose([Validators.pattern('^[0-9]{4,}$'), Validators.required])],
      remember: [false],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    console.log('Phone : ' + this.loginForm.value.phone
      + (this.loginForm.value.phone.valid ? ' OK' : ' KO !'));
    console.log('Password : ' + this.loginForm.value.password
      + (this.loginForm.value.password.valid ? ' OK' : ' KO !'));

    if (this.loginForm.valid) {
      this.viewCtrl.dismiss().then();
    } 

    // Sample code for auth provider
    /*this.auth.login('0600000042', '0000')
      .then((token) => {
        console.log('RESULT', token);
      })
      .catch((httpErrorResponse) => {
        console.log('ERROR', httpErrorResponse.error.message);
      });*/
  }

  openSignUpPage() {
    this.navCtrl.push(SignUpPage).then();
  }

}
