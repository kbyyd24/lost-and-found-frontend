import {sign_in, login, log_out} from '../config/ActionNames'
import User from '../model/User'

const reducer = (state, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case sign_in.sign_in_pending:
      newState.user.signIn.msg = 'pending';
      newState.user.signIn.state = 100;
      return newState;
    case sign_in.sign_in_success:
    case sign_in.sign_in_failed:
      newState.user.signIn = {msg: action.msg, state: action.state};
      return newState;
    case login.pending:
      newState.user.logIn = {
        msg: 'pending',
        state: 100
      };
      return newState;
    case login.success:
      newState.user = new User();
      newState.user.username = action.user.username;
      newState.user.email = action.user.email;
      newState.user.token = action.user.token;
      newState.user.state = true;
      return newState;
    case login.failed:
      newState.user = new User();
      newState.user.logIn = {
        msg: action.msg,
        state: 400
      };
      return newState;
    case log_out.pending:
      newState.user.logout = {msg: 'pending', state: 100};
      return newState;
    case log_out.success:
      newState.user = new User();
      newState.user.logout = {msg: action.msg, state: 200};
      return newState;
    case log_out.failed:
      newState.user.logout = {msg: action.msg, state: 400};
      return newState;
    case log_out.clean:
      newState.user.logout = {msg: null, state:0};
      return newState;
    default:
      return state
  }
};

export default reducer;