import * as actionName from '../config/ActionNames'
import User from '../model/User'

const reducer = (state, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case actionName.sign_in.sign_in_pending:
      newState.user.signIn = {msg: 'pending', state: 100};
      return newState;
    case actionName.sign_in.sign_in_success:
    case actionName.sign_in.sign_in_failed:
      newState.user.signIn = {msg: action.msg, state: action.state};
      return newState;
    case actionName.login.pending:
      newState.user.logIn = {
        msg: 'pending',
        state: 100
      };
      return newState;
    case actionName.login.success:
      newState.user = new User();
      newState.user.username = action.user.username;
      newState.user.email = action.user.email;
      newState.user.token = action.user.token;
      newState.user.state = true;
      return newState;
    case actionName.login.failed:
      newState.user = new User();
      newState.user.logIn = {
        msg: action.msg,
        state: 400
      };
      return newState;
    case actionName.log_out.pending:
      newState.user.logout = {msg: 'pending', state: 100};
      return newState;
    case actionName.log_out.success:
      newState.user = new User();
      newState.user.logout = {msg: action.msg, state: 200};
      return newState;
    case actionName.log_out.failed:
      newState.user.logout = {msg: action.msg, state: 400};
      return newState;
    case actionName.log_out.clean:
      newState.user.logout = {msg: null, state:0};
      return newState;
    case actionName.lost_page.pending:
      newState.lostItemPage.state = {msg: 'pending', state: 100};
      return newState;
    case actionName.lost_page.success:
      newState.lostItemPage.lostItems = action.lostItems;
      newState.lostItemPage.page = action.page;
      newState.lostItemPage.state = {msg: 'success', state: 200};
      return newState;
    case actionName.lost_page.failed:
      newState.lostItemPage.state = {msg: action.msg, state: 400};
      return newState;
    case actionName.add_lost_item.pending:
    case actionName.load_lost_item.pending:
      newState.openingLostItem.state = {msg: 'pending', state:100};
      newState.openingLostItem.lostItem = null;
      return newState;
    case actionName.add_lost_item.success:
    case actionName.load_lost_item.success:
    case actionName.close_lost_item.success:
      newState.openingLostItem.state = {msg: 'success', state: 200};
      newState.openingLostItem.lostItem = action.lostItem;
      return newState;
    case actionName.add_lost_item.failed:
    case actionName.load_lost_item.failed:
      newState.openingLostItem.state = {msg: action.msg, state: 400};
      newState.openingLostItem.lostItem = null;
      return newState;
    case actionName.close_lost_item.pending:
      newState.openingLostItem.state = {msg: 'pending', state: 100};
      return newState;
    case actionName.close_lost_item.failed:
      newState.openingLostItem.state = {msg: action.msg, state: 400};
      return newState;
    default:
      return state
  }
};

export default reducer;