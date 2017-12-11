export default class User {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;

  constructor({ phone, firstName, lastName, email, profile }) {
    this.phone = phone;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profile = profile;
  }

  gravatarImage(): String {
    // TODO : call gravatar provider with the email
    return 'https://www.shareicon.net/download/2016/07/05/791214_man_512x512.png';
  }
}
