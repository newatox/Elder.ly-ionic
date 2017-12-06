export default class Contact {
  wsId: number|undefined;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
  gravatar: string|undefined;
  isFamilinkUser: boolean;
  isEmergencyUser: boolean;

  constructor({ _id = null, phone, firstName, lastName, email, profile, gravatar = null, isFamilinkUser = false, isEmergencyUser = false }) {
    this.wsId = _id;
    this.phone = phone;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profile = profile;
    this.gravatar = gravatar;
    this.isFamilinkUser = isFamilinkUser;
    this.isEmergencyUser = isEmergencyUser;
  }
}
