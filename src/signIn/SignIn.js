import {connect} from 'react-redux'
import SignInUI from './SignInUI'

const mapStateToProps = (state) => {
  return state
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signIn: (inputs) => {
      dispatch({
        type: 'SIGN_IN',
        inputs
      })
    }
  }
};

const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignInUI);

export default SignIn;