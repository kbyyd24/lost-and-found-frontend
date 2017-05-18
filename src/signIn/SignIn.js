import {connect} from 'react-redux'
import SignInUI from './SignInUI'

const mapStateToProps = (state) => {
  return state
};

const fetchToSignIn = (signInUser) => dispatch => {
  dispatch({type: 'SIGN_IN_PENDING'});
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
      console.log(body);
      dispatch({
        type: 'SIGN_IN_SUCCESS',
        msg: body.msg
      })
    })
    .catch(error => {
      dispatch({
        type: 'SIGN_IN_FAILED',
        msg: error.message
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