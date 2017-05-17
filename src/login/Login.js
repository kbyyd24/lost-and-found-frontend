import {connect} from 'react-redux'
import LoginUI from './LoginUI'

const mapStateToProps = (state) => {
  return state
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (inputs) => {
      dispatch({
        type: 'LOGIN',
        inputs
      })
    }
  }
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginUI);

export default Login;