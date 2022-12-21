export default class UserContextModel {
  constructor(
    accessToken,
    authenticationToken,
    displayName,
    email,
    photoURL,
    id,
    isLoggedIn
  ) {
    this.accessToken = accessToken;
    this.authenticationToken = authenticationToken;
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
    this.id = id;
    this.isLoggedIn = isLoggedIn;
  }
}
