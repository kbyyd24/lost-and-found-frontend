import {connect} from 'react-redux'
import NavBarUI from './NavBarUI'
import {log_out} from '../config/ActionNames'
import {userServer} from '../config/ServerConfig'

const {protocol, host, port, baseURI} = userServer;

const fetchToLogOut = (username, token) => dispatch => {
  dispatch({type: log_out.pending});
  const deleteHeaders = new Headers({
    'user-token': token
  });
  const requestInit = {
    headers: deleteHeaders,
    method: 'DELETE'
  };
  const request = new Request(`${protocol}://${host}:${port}/${baseURI}/login/${username}`, requestInit);
  fetch(request)
    .then(response => {
      if (response.ok) {
        response.json()
          .then(body => {
            dispatch({
              type: log_out.success,
              msg: body.msg
            })
          })
      } else {
        response.json()
          .then(body => {
            dispatch({
              type: log_out.failed,
              msg: body.msg
            })
          })
      }
    })
};

const mapStateToProps = (state) => {
  const user = state.user;
  let resultProps = {};
  if (user.state) {
    resultProps = {username: user.username, token: user.token};
  }
  if (user.logout.state !== 0) {
    resultProps.logoutObj = user.logout;
  }
  return resultProps
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (username, token) => {
      dispatch(fetchToLogOut(username, token));
    },
    cleanLogoutMsg: () => {
      dispatch({type: log_out.clean});
    }
  }
};

const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarUI);

export default NavBar