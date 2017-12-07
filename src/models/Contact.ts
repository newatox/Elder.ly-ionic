export default class Contact {
  constructor(public phone: string, public firstName: string,
              public lastName: string, public email: string, public profile: string,
              public isFamilinkuser: boolean = false,
              public isEmergencyUser: boolean = false, public isFavorite: boolean = false,
              public frequency: number = 0, public wsId?: string, public gravatar?: string) {

  }

  incrementFrequency(step: number = 1) {
    this.frequency += step;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
