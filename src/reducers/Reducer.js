import {sign_in} from '../config/ActionNames'

const reducer = (state, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'CHANGE_STATE':
      return {userState: !state.userState};
    case sign_in.sign_in_pending:
      newState.user.signIn = 'pending';
      return newState;
    case sign_in.sign_in_success:
      newState.user.signIn = action.msg;
      return newState;
    case sign_in.sign_in_failed:
      newState.user.signIn = action.msg;
      return newState;
    default:
      return state
  }
};

export default reducer;