import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

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
  email: 'test@example.com';
  password: 'test';


  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    this.viewCtrl.dismiss().then()
  }

}
