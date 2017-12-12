import * as gravatar from 'gravatar';

export default class Contact {
  constructor(public phone: string,
              public firstName: string,
              public lastName: string,
              public email: string,
              public profile: string,
              public wsId?: string,
              private theGravatar: string = '',
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
    this.theGravatar = gravatar.url(this.email, { s: '200', d: 'retro' });
  }

  get gravatar() {
    if (this.theGravatar === '') {
      this.theGravatar = gravatar.url(this.email, { s: '200', d: 'retro' });
    }
    return this.theGravatar;
  }
}
