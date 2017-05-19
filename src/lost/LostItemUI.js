import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

class LostItemUI extends Component {

  componentWillMount() {
    const itemId = this.props.match.params.itemId;
    if (!this.props.lostItem || itemId !== this.props.lostItem.id) {
      this.props.loadItem(itemId);
    }
  }

  handleCloseItem = () => {
    const {username, token, deleteItem} = this.props;
    const itemId = this.props.match.params.itemId;
    deleteItem(itemId, username, token);
  };

  render() {
    const {username, lostItem, itemState} = this.props;
    if (itemState.state === 100) {
      return (<div className="container">
        <span className="alert alert-info col-lg-12 text-center">{itemState.msg}</span>
      </div>)
    } else if (itemState.state === 400) {
      return (<div className="container">
        <span className="alert alert-danger col-lg-12 text-center">{itemState.msg}</span>
      </div>)
    }
    const {
      stateHtml, titleHtml, itemNameHtml, dateHtml,
      descriptionHtml, buttonHtml, closeButtonHtml
    } = this.buildHtmlComponents(lostItem, username);
    this.buildHtmlComponents(lostItem, username);
    return (
      <div className="container">
        <div className="col-lg-2">{stateHtml}</div>
        <div className="col-lg-10">{titleHtml}</div>
        <div className="col-lg-12">{itemNameHtml}{dateHtml}</div>
        <div className="col-lg-12">{descriptionHtml}</div>
        <div>
          <span className="left">{closeButtonHtml}</span>
          <span className="right">{buttonHtml}</span>
        </div>
      </div>
    )
  }

  buildHtmlComponents(lostItem, username) {
    const stateHtml = lostItem.state === 'enable' ?
      <span className="label label-success">{lostItem.state}</span> :
      <span className="label label-default">{lostItem.state}</span>;
    const titleHtml = <h3>{lostItem.title}</h3>;
    const itemNameHtml = <span className="label label-default">{lostItem.itemName}</span>;
    const date = new Date(lostItem.lostTime);
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const dateHtml = <span className="label label-default">{dateStr}</span>;
    const descriptionHtml = <p>{lostItem.description}</p>;
    let buttonHtml, closeButtonHtml;
    if (username) {
      if (lostItem.owner === username) {
        buttonHtml = <Link to={`/losts/${lostItem.id}/update`}>
          <button className="btn btn-success">更新</button>
        </Link>;
        closeButtonHtml = <button className="btn btn-danger">关闭</button>
      } else {
        buttonHtml = <Link to={`/losts/${lostItem.id}/returns/${username}`}>
          <button className="btn btn-primary">认领</button>
        </Link>
      }
    }
    return {stateHtml, titleHtml, itemNameHtml, dateHtml, descriptionHtml, buttonHtml, closeButtonHtml}
  }
}

export default LostItemUI;