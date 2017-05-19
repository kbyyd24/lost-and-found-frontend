import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../css/main.css'

const previous = 'previous';
const next = 'next';

class LostUI extends Component {

  componentDidMount() {
    if (this.props.lostItems.length === 0) {
      const {page, listSize, sort, loadPage} = this.props;
      loadPage(page, listSize, sort);
    }
  }

  handleChangePage = (event) => {
    let {page, listSize, sort, loadPage} = this.props;
    if (event.target.name === next) {
      ++page;
    } else {
      --page;
    }
    loadPage(page, listSize, sort);
  };

  render() {
    const {page, lostItems, state} = this.props;
    const previousButton = page === 1 ?
      (<button name={previous} onClick={this.handleChangePage} type="button"
               className="btn btn-default" disabled="disabled">上一页</button>) :
      (<button name={previous} onClick={this.handleChangePage} type="button"
               className="btn btn-default">上一页</button>);
    const nextButton = (<button name={next} onClick={this.handleChangePage} type="button"
                                className="btn btn-primary">下一页</button>);
    const addItemButton = (<Link to={"/losts/new"}>
      <button type="button" className="btn btn-success">丢失物品</button>
    </Link>);
    let className;
    switch (state.state) {
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
        break;
    }
    const stateMsgHtml = className ? <div className={className}><span>{state.msg}</span></div> : null;
    const lostItemsHtml = lostItems.map(lostItem => {
      const date = new Date(lostItem.createTime);
      const displayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      return (
        <li key={lostItem.id} className="list-group-item">
          <Link to={`/lost/${lostItem.id}`}>
            <h4 className="list-group-item-heading">{lostItem.title}</h4>
            <p className="list-group-item-text">创建时间: {displayDate}</p>
          </Link>
        </li>)
    });
    return (
      <div className="container">
        <div className="container">
          <div className="col-lg-3">{previousButton}</div>
          <div className="col-lg-6">{stateMsgHtml}</div>
          <div className="col-lg-3">{nextButton}</div>
        </div>
        <div>
          <div className="container">
            <ul className="list-group">{lostItemsHtml}</ul>
          </div>
        </div>
        <div>
          <div className="container">
            <div className="div-center">{addItemButton}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LostUI;