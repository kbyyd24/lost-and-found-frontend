import {connect} from 'react-redux'
import LostNewUI from './LostNewUI'
import {add_lost_item} from '../config/ActionNames'
import {itemServer} from '../config/ServerConfig'

const server = `${itemServer.protocol}://${itemServer.host}:${itemServer.port}/${itemServer.baseURI}`;

const fetchToAddItem = (newItem, username, token) => dispatch => {
  dispatch({type: add_lost_item.pending});
  const requestHeader = new Headers({
    'content-type': 'application/json',
    'username': username,
    'user-token': token
  });
  const requestInit = {
    headers: requestHeader,
    method: 'POST',
    body: JSON.stringify(newItem)
  };
  const request = new Request(`${server}/lost`, requestInit);
  fetch(request)
    .then(response => {
      if (response.ok) {
        response.json()
          .then(body => {
            dispatch({
              type: add_lost_item.success,
              lostItem: body
            })
          })
      } else {
        response.json()
          .then(body => {
            dispatch({
              type: add_lost_item.failed,
              msg: body.msg
            })
          })
      }
    })
};

const mapStateToProps = state => {
  const {user, openingLostItem} = state;
  return {user, openingLostItem};
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: (newItem, username, token) => {
      dispatch(fetchToAddItem(newItem, username, token));
    }
  };
};

const LostNew = connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(LostNewUI);

export default LostNew;