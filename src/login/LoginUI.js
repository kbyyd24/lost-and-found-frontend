import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../css/main.css'

class LoginUI extends Component {
  login = () => {
    const {login} = this.props;
    const inputs = [...document.getElementsByTagName('input')]
      .map(element => {
        return {
          key: element.name,
          value: element.value
        }
      });
    console.log(inputs);
    login(inputs);
  };

  render() {
    const {state, msg} = this.props;
    let className;
    switch (state) {
      case 100:
        className = "alert alert-info";
        break;
      case 200:
        className = "alert alert-success";
        break;
      case 400:
        className = "alert alert-warning";
        break;
      default:
        className = null;
    }
    let signInMsgHTML = className === null ? null :
      <div className={className}><span>{msg}</span></div>;
    return (
      <div>
        <div className="col-lg-3"></div>
        <div className="container text-center div-center col-lg-6">
          <div>
            <div className="col-md-6">
              <Link to="/signIn">注册</Link>
            </div>
            <div className="col-md-6">
              登录
            </div>
          </div>
          <div>
            <div key="loginName" className="input-group col-lg-12">
              <span className="input-group-addon">用户名/邮箱</span>
              <input className="form-control" name="loginName" placeholder="用户名/邮箱" type="text"/>
            </div>
            <div key="password" className="input-group col-lg-12">
              <span className="input-group-addon">密码</span>
              <input className="form-control" name="password" placeholder="密码" type="password"/>
            </div>
          </div>
          {signInMsgHTML}
          <div>
            <button className="btn btn-success" onClick={this.login}>登录</button>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginUI;