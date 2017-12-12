import { Component } from '@angular/core';
import {
  AlertController,
  Platform,
  Events,
  IonicPage,
  NavController,
  ViewController,
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';
import { AuthProvider } from '../../providers/auth/auth';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";

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

  constructor(public viewCtrl: ViewController,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              public events: Events,
              public splashScreen: SplashScreen,
              public platform: Platform,
              private auth: AuthProvider,
              public translate: TranslateService,
  ) {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{4,}$')])],
      remember: [false],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.splashScreen.hide();
    }
  }

  doLogin() {
    console.log('Phone : ' + this.loginForm.value.phone);
    console.log('Password : ' + this.loginForm.value.password);

    this.formSubmitted = true;

    // TODO uncomment: if (this.loginForm.valid) {
    if (true) {
      // TODO uncomment: this.auth.login(this.loginForm.value.phone, this.loginForm.value.password)
      this.auth.login('0600000042', '0000')
        .then((token) => {
          console.log('RESULT', token);

          if (this.loginForm.value.remember) {
            // TODO: remember login
          }

          this.events.publish('auth:login'); // Send the 'login' event to MyApp

          this.viewCtrl.dismiss().then();
        })
        .catch((httpErrorResponse) => {
          console.log('ERROR', httpErrorResponse.error.message);
          // TODO: i18n
          const alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: httpErrorResponse.error.message,
            buttons: ['OK'],
          });
          alert.present();
        });
    }
  }

  openSignUpPage() {
    this.navCtrl.push(SignUpPage).then();
  }

  forgottenPasswordAlert(error = false) {
    var forgottenPwPlaceholder = 'FORGOTTEN_PASSWORD_PAGE_NAME';
    var forgottenPwMessagePlaceholder = 'FORGOTTEN_PW_MESSAGE';
    var invalidNumberPlaceholder = 'INVALID_NUMBER';
    var cancelLabelPlaceholder = 'CANCEL_LABEL';
    var sendLabelPlaceholder = 'SEND_LABEL';
    var forgottenPWSentPlaceholder = 'FORGOTTEN_PW_SENT';
    var okLabelPlaceholder = 'OK_LABEL';

    this.translate.get(forgottenPwPlaceholder).subscribe(
      (translation) => {
        forgottenPwPlaceholder = translation;
      });
    this.translate.get(forgottenPwMessagePlaceholder).subscribe(
      (translation) => {
        forgottenPwMessagePlaceholder = translation;
      });
    this.translate.get(invalidNumberPlaceholder).subscribe(
      (translation) => {
        invalidNumberPlaceholder = translation;
      });
    this.translate.get(cancelLabelPlaceholder).subscribe(
      (translation) => {
        cancelLabelPlaceholder = translation;
      });
    this.translate.get(sendLabelPlaceholder).subscribe(
      (translation) => {
        sendLabelPlaceholder = translation;
      });
    this.translate.get(forgottenPWSentPlaceholder).subscribe(
      (translation) => {
        forgottenPWSentPlaceholder = translation;
      });
    this.translate.get(okLabelPlaceholder).subscribe(
      (translation) => {
        okLabelPlaceholder = translation;
      });

    const phoneRegex = /^[0-9]{10}$/;
    var phone = '';
    const prompt = this.alertCtrl.create({
      title: forgottenPwPlaceholder,
      message: forgottenPwMessagePlaceholder,
      inputs: [
        {
          name: 'phone',
          placeholder: (error ? invalidNumberPlaceholder :
                                  (phoneRegex.test(this.loginForm.value.phone)
                                  ? this.loginForm.value.phone : '')),
          type: 'number',
        },
      ],
      buttons: [
        {
          text: cancelLabelPlaceholder,
          handler: () => {
            console.log('Cancel clicked');
            return;
          },
        },
        {
          text: sendLabelPlaceholder,
          handler: (data) => {
            phone = data.phone;
            console.log('Saved clicked');
            console.log(phone);

            if (phoneRegex.test(phone)) {
              this.auth.forgot(phone).then(() => {
                const successAlert = this.alertCtrl.create({
                  title: forgottenPwPlaceholder,
                  message: forgottenPWSentPlaceholder,
                  buttons: [
                    { text: okLabelPlaceholder },
                  ],
                });
                successAlert.present().then();
              });
            } else {
              this.forgottenPasswordAlert(true);
            }
          },
        },
      ],
    });
    prompt.present().then();
  }
}
