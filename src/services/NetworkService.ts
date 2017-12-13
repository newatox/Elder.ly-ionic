import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Events, Platform, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NetworkService {
  private toast;
  private toastVisible = false;

  constructor(private network: Network,
              private toastCtrl: ToastController,
              private translate: TranslateService,
              private platform: Platform,
              private events: Events) {
    translate.setDefaultLang('fr');
  }

  isOnline(): boolean {
    return this.network.type !== 'none';
  }

  watch() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      console.log('Watching network on device');
    } else {
      console.log('Watching network on Webview');
    }

    this.network.onConnect().subscribe((data) => {
      console.log('Online');
      if (this.toastVisible) {
        this.toast.dismiss();
      }
      this.events.publish('connected');
    },                                 (error) => {
      console.error(error);
    });

    this.network.onDisconnect().subscribe((data) => {
      console.log('Offline');
      this.initMessage();
      this.showMessage();
      this.events.publish('disconnected');
    },                                    (error) => {
      console.error(error);
    });
  }

  private initMessage() {
    let noNetworkMessage = 'NETWORK_NONE_MESSAGE';
    let okLabel = 'OK_LABEL';
    this.translate.get(noNetworkMessage).subscribe(
      (translation) => {
        noNetworkMessage = translation;
      });
    this.translate.get(okLabel).subscribe(
      (translation) => {
        okLabel = translation;
      });

    this.toast = this.toastCtrl.create({
      message: noNetworkMessage,
      showCloseButton: true,
      closeButtonText: okLabel,
    });
    this.toast.onDidDismiss(() => {
      this.toastVisible = false;
    });
  }

  showMessage() {
    this.toast.present();
    this.toastVisible = true;
  }
}
