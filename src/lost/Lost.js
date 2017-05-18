import {connect} from 'react-redux'
import LostUI from './LostUI'
import {itemServer} from '../config/ServerConfig'
import {lost_page} from '../config/ActionNames'

const {protocol, host, port, baseURI} = itemServer;

const fetchToNextPage = (page, listSize, sort) => dispatch => {
  dispatch({type: lost_page.pending});
  const query = `?page=${page}&listSize=${listSize}&sort=${sort}`;
  const path = `${protocol}://${host}:${port}/${baseURI}/lost`;
  fetch(`${path}${query}`)
    .then(response => {
      if (response.ok) {
        response.json()
          .then(body => {
            dispatch({
              type: lost_page.success,
              lostItems: body,
              page: page
            })
          })
      } else if (response.status === 404) {
        dispatch({
          type: lost_page.success,
          lostItems: [],
          page: page
        })
      } else {
        response.json()
          .then(body => {
            dispatch({
              type: lost_page.failed,
              msg: body.msg
            })
          })
      }
    })
};

const mapStateToProps = (state) => {
  return state.lostItemPage;
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPage: (page, listSize, sort) => {
      dispatch(fetchToNextPage(page, listSize, sort))
    }
  }
};

const Lost = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(LostUI);

export default Lost;