import {sign_in} from '../config/ActionNames'

const reducer = (state, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'CHANGE_STATE':
      return {userState: !state.userState};
    case sign_in.sign_in_pending:
      newState.user.signIn.msg = 'pending';
      newState.user.signIn.state = 100;
      return newState;
    case sign_in.sign_in_success:
    case sign_in.sign_in_failed:
      newState.user.signIn = {msg: action.msg, state: action.state};
      return newState;
    default:
      return state
  }
};

export default reducer;