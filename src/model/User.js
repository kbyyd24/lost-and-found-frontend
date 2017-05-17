class User {
  constructor() {
    this.username = '';
    this.token = '';
    this.email = '';
    this.state = false;
  }
  saveLoginMessage = (useranme, token) => {
    this.username = useranme;
    this.token = token;
  };
  saveEmail = (email) => {
    this.email = email;
  };
  logout = () => {
    this.username = '';
    this.token = '';
    this.email = '';
  };
}

export default User;