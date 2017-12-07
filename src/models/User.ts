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
}
