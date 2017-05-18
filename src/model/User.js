class User {
  constructor() {
    this.username = null;
    this.token = null;
    this.email = null;
    this.state = false;
    this.signIn = {
      msg: null,
      state: 0
    };
    this.logIn = {
      msg: null,
      state: 0
    };
    this.logout = {
      msg: null,
      state: 0
    }
  }
}

export default User;