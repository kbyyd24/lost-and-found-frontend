import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

class NavBar extends Component {
  render() {
    let button;
    if (this.props.userState) {
      button = <button className="btn btn-default navbar-btn">Sign out</button>
    } else {
      button = <button className="btn btn-success navbar-btn">Sign in</button>;
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
            </ul>
            {button}
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;