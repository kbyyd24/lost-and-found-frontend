import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

class NavBarUI extends Component {

  handleLogout = () => {
    const {username, token}  = this.props;
    this.props.logout(username, token);
  };

  render() {
    let userButton, usernameHtml, logoutMsgHtml;
    const {username} = this.props;
    if (username === undefined) {
      userButton = (<li>
        <button className="btn btn-success navbar-btn"><Link to={"/login"}>login</Link></button>
      </li>);
    } else {
      userButton = (<li>
        <button onClick={this.handleLogout} className="btn btn-default navbar-btn">logout</button>
      </li>);
      usernameHtml = (<li><Link to={`/user/home/${username}`}>{username}</Link></li>);
    }
    const logout = this.props.logoutObj;
    if (logout) {
      let className;
      switch (logout.state) {
        case 100:
          className = 'alert alert-info';
          break;
        case 200:
          className = 'alert alert-success';
          break;
        case 400:
          className = 'alert alert-warning';
          break;
        default:
          className = null;
      }
      logoutMsgHtml = className === null ? null :
        <li>
          <div className={className}><span>{logout.msg}</span></div>
        </li>;
    }
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">失物招领平台</Link>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/losts">失物信息</Link></li>
              <li><Link to="/founds">拾物信息</Link></li>
              {userButton}
              {usernameHtml}
              {logoutMsgHtml}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBarUI;