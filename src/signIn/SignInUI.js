import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../css/main.css'

class SignInUI extends Component {
  signIn = () => {
    const {signIn} = this.props;
    const inputs = [...document.getElementsByTagName('input')]
      .map(element => ({key: element.name, value: element.value}));
    signIn(inputs);
  };

  render() {
    const {signInObj} = this.props;
    let className;
    switch (signInObj.state) {
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
      <div className={className}><span>{signInObj.msg}</span></div>;
    return (
      <div>
        <div className="col-lg-3"></div>
        <div className="container text-center div-center col-lg-6">
          <div>
            <div className="col-md-6">
              注册
            </div>
            <div className="col-md-6">
              <Link to={"/login"}>登录</Link>
            </div>
          </div>
          <div>
            <div key="username" className="input-group col-lg-12">
              <span className="input-group-addon">用户名</span>
              <input className="form-control" name="username" placeholder="用户名" type="text"/>
            </div>
            <div key="email" className="input-group col-lo-12">
              <span className="input-group-addon">邮箱</span>
              <input className="form-control" name="email" placeholder="邮箱" type="email"/>
            </div>
            <div key="password" className="input-group col-lg-12">
              <span className="input-group-addon">密码</span>
              <input className="form-control" name="password" placeholder="密码" type="password"/>
            </div>
          </div>
          {signInMsgHTML}
          <div>
            <button className="btn btn-success" onClick={this.signIn}>注册</button>
          </div>
        </div>
      </div>
    )
  }
}

export default SignInUI;