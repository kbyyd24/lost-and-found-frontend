import {connect} from 'react-redux'
import SignInUI from './SignInUI'
import {sign_in} from '../config/ActionNames'

const mapStateToProps = (state) => {
  return {signInObj: state.user.signIn}
};

const fetchToSignIn = (signInUser) => dispatch => {
  dispatch({type: sign_in.sign_in_pending});
  const postHeaders = new Headers({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Content-Type': 'application/json'
  });
  const postInit = {
    headers: postHeaders,
    method: 'POST',
    body: JSON.stringify(signInUser)
  };
  const request = new Request('http://localhost:8080/user', postInit);
  fetch(request)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.json().msg);
      }
    })
    .then(body => {
      dispatch({
        type: sign_in.sign_in_success,
        msg: body.msg,
        state: 200
      })
    })
    .catch(error => {
      dispatch({
        type: sign_in.sign_in_failed,
        msg: error.message,
        state: 400
      })
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