import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {update_lost_item} from '../config/ActionNames'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../css/main.css'

class LostItemUpdateUI extends Component {

  handleUpdate = () => {
    const {username, token, update, editingItem} = this.props;
    let updateItem =
      [...document.getElementsByTagName('input'), document.getElementById('description')]
        .map(element => ({key: element.name, value: element.value}))
        .reduce((acc, next) => {
          let value = next.value;
          if (next.key === 'lostTime') {
            value = new Date(value).getTime();
          }
          acc[next.key] = value;
          return acc;
        }, {});
    updateItem.id = editingItem.id;
    update(updateItem, username, token);
  };

  render() {
    const {username, editingItem, updateState} = this.props;
    if (username !== editingItem.owner) {
      return (<Redirect to={'/losts'}/>)
    }
    if (updateState.state === 400) {
      return (<Redirect to="/losts"/>)
    } else if (updateState.state === 200 && updateState.msg === update_lost_item.success) {
      return (<Redirect to={`/losts/${editingItem.id}`}/>)
    }
    const {titleInput, itemNameInput, lostTimeInput, descriptionInput, buttonHtml} =
      this.buildHtmlComponents(editingItem);
    return (
      <div className="container">
        <div>{titleInput}</div>
        <div>{itemNameInput}</div>
        <div>{lostTimeInput}</div>
        <div>{descriptionInput}</div>
        <div>{buttonHtml}</div>
      </div>
    )
  }

  buildHtmlComponents(editingItem) {
    const titleInput = (<div className="input-group">
      <span className="input-group-addon">标题</span>
      <input className="form-control" defaultValue={editingItem.title} name="title" type="text"/>
    </div>);
    const itemNameInput = (<div className="input-group">
      <span className="input-group-addon">物品名称</span>
      <input type="text" className="form-control" defaultValue={editingItem.itemName} name="itemName"/>
    </div>);
    const date = new Date(editingItem.lostTime);
    const month = date.getMonth() + 1;
    const defaultDateValue = `${date.getFullYear()}-${month > 9 ? month : `0${month}`}-${date.getDate()}`;
    const lostTimeInput = (<div className="input-group">
      <span className="input-group-addon">丢失时间</span>
      <input type="date" className="form-control" defaultValue={defaultDateValue} name="lostTime"/>
    </div>);
    const descriptionInput = (<div className="input-group">
      <span className="input-group-addon">详情</span>
      <textarea name="description" id="description" cols="30" rows="10" defaultValue={editingItem.description}></textarea>
    </div>);
    const buttonHtml = (<button onClick={this.handleUpdate} className="btn btn-success">更新</button>);
    return {titleInput, itemNameInput, lostTimeInput, descriptionInput, buttonHtml}
  }
}

export default LostItemUpdateUI;