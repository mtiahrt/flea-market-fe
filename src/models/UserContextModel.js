export default class UserContextModel {
  constructor(user, accessToken) {
    this.accessToken = accessToken;
    this.authenticationToken = user?.accessToken;
    this.displayName = user?.displayName;
    this.email = user?.email;
    this.photoURL = user?.photoURL;
    this.id = user?.uid;
    this.isLoggedIn = user?.uid ? true : false;
    this.displayLogin = false;
  }
}
UserContextModel.prototype.signOut = function () {
  this.accessToken = null;
  this.authenticationToken = null;
  this.displayName = null;
  this.email = null;
  this.photoURL = null;
  this.id = null;
  this.isLoggedIn = false;
  this.displayLogin = false;
  return this;
};
