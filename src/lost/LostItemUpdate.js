import {connect} from 'react-redux'
import LostItemUpdateUI from './LostItemUpdateUI'
import {update_lost_item} from '../config/ActionNames'
import {itemServer} from '../config/ServerConfig'

const fetchToUpdateItem = (updateItem, username, token) => dispatch => {
  dispatch({type: update_lost_item.pending});
  const requestHeader = new Headers({
    'content-type': 'application/json',
    username,
    'user-token': token
  });
  const requestInit = {
    headers: requestHeader,
    method: 'PUT',
    body: JSON.stringify(updateItem)
  };
  fetch(new Request(`${itemServer.path}/lost/${updateItem.id}`, requestInit))
    .then(response => {
      if (response.ok){
        response.json()
          .then(body => {
            dispatch({
              type: update_lost_item.success,
              lostItem: body
            })
          })
      } else {
        response.json()
          .then(body => {
            dispatch({
              type: update_lost_item.failed,
              msg: body.msg
            })
          })
      }
    })
};

const mapStateToProps = state => {
  return {
    username: state.user.username,
    token: state.user.token,
    editingItem: state.openingLostItem.lostItem,
    updateState: state.openingLostItem.state
  }
};

const mapDispatchToProps = dispatch => {
  return {
    update: (updateItem, username, token) => {
      dispatch(fetchToUpdateItem(updateItem, username, token))
    }
  }
};

const LostItemUpdate = connect(mapStateToProps, mapDispatchToProps)(LostItemUpdateUI);

export default LostItemUpdate