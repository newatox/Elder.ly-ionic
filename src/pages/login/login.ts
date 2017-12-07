import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
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
  phone: '0600000042';
  password: '0000';


  constructor(public viewCtrl: ViewController, public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    this.viewCtrl.dismiss().then();

    // Sample code for auth provider
    /*this.auth.login('0600000042', '0000')
      .then((result) => {
        console.log('TOKEN', result);
        return this.auth.getCurrentUser(result);
      })
      .then((result) => {
        console.log('USER', result);
      })
      .catch((error) => {
        console.log('ERROR', error);
      });*/
  }

  openSignUpPage() {
    this.navCtrl.push(SignUpPage).then();
  }

}
