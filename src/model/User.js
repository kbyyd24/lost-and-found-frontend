class User {
  constructor() {
    this.username = null;
    this.token = null;
    this.email = null;
    this.state = false;
    this.signIn = null;
    this.logIn = null;
  }
  saveLoginMessage = (useranme, token) => {
    this.username = useranme;
    this.token = token;
  };
  saveEmail = (email) => {
    this.email = email;
  };
  logout = () => {
    this.username = null;
    this.token = null;
    this.email = null;
  };
}

export default User;