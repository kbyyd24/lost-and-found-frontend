import {connect} from 'react-redux'
import LostItemUI from './LostItemUI'
import {itemServer} from '../config/ServerConfig'
import {load_lost_item, close_lost_item} from '../config/ActionNames'

const server =
  `${itemServer.protocol}://${itemServer.host}:${itemServer.port}/${itemServer.baseURI}/lost`;

const fetchToLoadLostItem = itemId => dispatch => {
  dispatch({type: load_lost_item.pending});
  let responseMap = new Map();
  responseMap.set(200, response => response.json()
    .then(body => {
      dispatch({
        type: load_lost_item.success,
        lostItem: body
      })
    }));
  responseMap.set(404, response => response.json()
    .then(body => {
      dispatch({
        type: load_lost_item.failed,
        msg: body.msg
      })
    }));
  fetch(`${server}/${itemId}`)
    .then(response => {
      responseMap.get(response.status)(response)
    })
};

const fetchToCloseItem = (itemId, username, token) => dispatch => {
  dispatch({type:close_lost_item.pending});
  const requestHeaders = new Headers({
    username: username,
    'user-token': token
  });
  const requestInit = {
    headers: requestHeaders,
    method: 'DELETE'
  };
  fetch(new Request(`${server}/${itemId}`, requestInit))
    .then(response => {
      if (response.ok) {
        response.json()
          .then(body => {
            dispatch({
              type: close_lost_item.success,
              lostItem: body
            })
          })
      } else {
        response.json()
          .then(body => {
            dispatch({
              type: close_lost_item.failed,
              msg: body.msg
            })
          })
      }
    })
};

const mapStateToProps = state => {
  const {user, openingLostItem} = state;
  return {
    username: user.username,
    token: user.token,
    lostItem: openingLostItem.lostItem,
    itemState: openingLostItem.state
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadItem: (itemId) => {
      dispatch(fetchToLoadLostItem(itemId))
    },
    deleteItem: (itemId, username, token) => {
      dispatch(fetchToCloseItem(itemId, username, token))
    }
  }
};

const LostItem = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(LostItemUI);

export default LostItem;