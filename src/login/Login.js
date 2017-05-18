import {connect} from 'react-redux'
import LoginUI from './LoginUI'
import {login} from '../config/ActionNames'
import {userServer} from '../config/ServerConfig'

const {protocol, host, port, baseURI} = userServer;

const fetchToLogin = logInUser => dispatch => {
  dispatch({type: login.pending});
  const postHeaders = new Headers({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'content-type': 'application/json'
  });
  const requestInit = {
    headers: postHeaders,
    method: 'POST',
    body: JSON.stringify(logInUser)
  };
  const request = new Request(`${protocol}://${host}:${port}/${baseURI}/login`, requestInit);
  fetch(request)
    .then(response => {
      if (response.status === 200) {
        response.json()
          .then(body => {
            dispatch({
              type: login.success,
              user: body
            })
          })
      } else {
        response.json()
          .then(body => {
            dispatch({
              type: login.failed,
              msg: body.msg
            })
          })
      }
    })
};

const mapStateToProps = (state) => {
  if (state.user.state) {
    return {state: 200, msg: 'login success'}
  }
  return state.user.logIn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (inputs) => {
      const loginUser = inputs.reduce((acc, next) => {
        acc[next.key] = next.value;
        return acc;
      }, {});
      dispatch(fetchToLogin(loginUser));
    }
  }
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginUI);

export default Login;