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
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

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
              public storage: Storage,
  ) {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{4,}$')])],
      remember: [true],
    });
    this.storage.get('storedPhoneNumber')
      .then((phone) => {
        this.loginForm.get('phone').setValue(phone);
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
    console.log('REMEMBER', this.loginForm.value.remember);


    this.formSubmitted = true;

    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value.phone, this.loginForm.value.password)
        .then((token) => {
          console.log('RESULT', token);
          if (this.loginForm.value.remember) {
            console.log('remember checked', this.loginForm.value.phone);
            this.storage.set('storedPhoneNumber', this.loginForm.value.phone)
              .then(() => {
                console.log('phone number stored');
              });
          } else {
            this.storage.remove('storedPhoneNumber')
              .then(() => {
                console.log('stored phone number erased');
              });
          }

          this.events.publish('auth:login'); // Send the 'login' event to MyApp

          this.viewCtrl.dismiss().then();
        })
        .catch((httpErrorResponse) => {
          console.log('LOGIN ERROR', httpErrorResponse.error.message);
          const errorMessage =
            navigator.onLine ? httpErrorResponse.error.message
              : this.translate.instant('LOGIN_OFFLINE_ERROR_MESSAGE');
          const alert = this.alertCtrl.create({
            title: this.translate.instant('LOGIN_ERROR'),
            subTitle: errorMessage,
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
    // Translated first here because potentially used twice
    let forgottenPwPlaceholder = 'FORGOTTEN_PASSWORD_PAGE_NAME';
    this.translate.get(forgottenPwPlaceholder).subscribe(
      (translation) => {
        forgottenPwPlaceholder = translation;
      });

    const phoneRegex = /^[0-9]{10}$/;
    let phone = '';
    const prompt = this.alertCtrl.create({
      title: forgottenPwPlaceholder,
      message: this.translate.instant('FORGOTTEN_PW_MESSAGE'),
      inputs: [
        {
          name: 'phone',
          placeholder: (error ? this.translate.instant('INVALID_NUMBER') :
                                  (phoneRegex.test(this.loginForm.value.phone)
                                  ? this.loginForm.value.phone : '')),
          type: 'number',
        },
      ],
      buttons: [
        {
          text: this.translate.instant('CANCEL_LABEL'),
          handler: () => {
            console.log('Cancel clicked');
            return;
          },
        },
        {
          text: this.translate.instant('SEND_LABEL'),
          handler: (data) => {
            phone = data.phone;
            console.log('Saved clicked');
            console.log(phone);

            if (phoneRegex.test(phone)) {
              this.auth.forgot(phone).then(() => {
                const successAlert = this.alertCtrl.create({
                  title: forgottenPwPlaceholder,
                  message: this.translate.instant('FORGOTTEN_PW_SENT'),
                  buttons: [
                    { text: this.translate.instant('OK_LABEL') },
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
