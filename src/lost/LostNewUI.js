import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

class LostNewUI extends Component {

  handleAddItem = () => {
    const newItem =
      [...document.getElementsByTagName('input'), document.getElementById('description')]
        .map(element => ({key: element.name, value: element.value}))
        .reduce((acc, next) => {
          let value = next.value;
          if (next.key === 'lostTime') {
            value = new Date(next.value).getTime();
          }
          acc[next.key] = value;
          return acc;
        }, {});
    const {user, addItem} = this.props;
    addItem(newItem, user.username, user.token);
  };

  render() {
    const {user, openingLostItem} = this.props;
    if (!user.username) {
      return (<Redirect from={"/losts/new"} to={"/login"}/>)
    }
    const {state} = openingLostItem;
    if (state.state === 200) {
      return (<Redirect from={"/losts/new"} to={`/losts/${openingLostItem.lostItem.id}`}/>)
    }
    let alertClassName;
    switch (state.state) {
      case 100:
        alertClassName = 'alert alert-info';
        break;
      case 200:
        alertClassName = 'alert alert-success';
        break;
      case 400:
        alertClassName = 'alert alert-warning';
        break;
      default:
        break;
    }
    const alertHtml = alertClassName ? <div className={alertClassName}><span>{state.msg}</span></div> : null;
    return (
      <div className="container">
        <div>
          <div className="input-group">
            <span className="input-group-addon">标题</span>
            <input name="title" className="form-control" type="text"/>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="input-group">
            <span className="input-group-addon">物品名称</span>
            <input name="itemName" className="form-control" placeholder="钱包/手机/..." type="text"/>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="input-group">
            <span className="input-group-addon">遗失时间</span>
            <input name="lostTime" className="form-control" type="date"/>
          </div>
        </div>
        <div>
          <span>详情</span>
          <textarea name="description" id="description" cols="30" rows="10"/>
        </div>
        {alertHtml}
        <button onClick={this.handleAddItem} className="btn btn-success right">添加</button>
      </div>
    )
  }
}

export default LostNewUI;