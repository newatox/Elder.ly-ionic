import * as gravatar from 'gravatar';

export default class Contact {
  constructor(public phone: string,
              public firstName: string,
              public lastName: string,
              public email: string,
              public profile: string,
              public wsId?: string,
              private urlGravatar: string = '',
              public isFamilinkuser: boolean = false,
              public isEmergencyUser: boolean = false,
              public isFavorite: boolean = false,
              public frequency: number = 0) {

  }

  incrementFrequency(step: number = 1) {
    this.frequency += step;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  setGravatar() {
    if (navigator.onLine) {
      this.urlGravatar = gravatar.url(this.email, { protocol: 'https', s: '200', d: 'retro' });
    } else {
      this.urlGravatar = 'assets/imgs/default-avatar.png';
    }
  }

  get gravatar() {
    if (this.urlGravatar === '') {
      this.urlGravatar = gravatar.url(this.email, { protocol: 'https', s: '200', d: 'retro' });
    }
    return this.urlGravatar;
  }
}
