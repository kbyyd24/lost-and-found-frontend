import {connect} from 'react-redux'
import SignInUI from './SignInUI'
import {sign_in} from '../config/ActionNames'
import {userServer} from '../config/ServerConfig'

const {protocol, host, port, baseURI} = userServer;

const mapStateToProps = (state) => {
  return {signInObj: state.user.signIn}
};

const fetchToSignIn = (signInUser) => dispatch => {
  dispatch({type: sign_in.sign_in_pending});
  const postHeaders = new Headers({
    'Content-Type': 'application/json'
  });
  const postInit = {
    headers: postHeaders,
    method: 'POST',
    body: JSON.stringify(signInUser)
  };
  const request = new Request(`${protocol}://${host}:${port}/${baseURI}`, postInit);
  fetch(request)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        response.json()
          .then(body => {
            dispatch({
              type: sign_in.sign_in_success,
              msg: body.msg,
              state: 200
            })
          })
      } else {
        response.json()
          .then(errorBody => {
            console.log(errorBody);
            dispatch({
              type: sign_in.sign_in_failed,
              msg: errorBody.msg,
              state: 400
            })
          })
      }
    })
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (inputs) => {
      const signInUser = inputs.reduce((acc, next) => {
        acc[next.key] = next.value;
        return acc;
      }, {});
      dispatch(fetchToSignIn(signInUser))
    }
  }
};

const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignInUI);

export default SignIn;