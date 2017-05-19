import {sign_in, login, log_out, lost_page, add_lost_item, load_lost_item, close_lost_item} from '../config/ActionNames'
import User from '../model/User'

const reducer = (state, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case sign_in.sign_in_pending:
      newState.user.signIn = {msg: 'pending', state: 100};
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
    case lost_page.pending:
      newState.lostItemPage.state = {msg: 'pending', state: 100};
      return newState;
    case lost_page.success:
      newState.lostItemPage.lostItems = action.lostItems;
      newState.lostItemPage.page = action.page;
      newState.lostItemPage.state = {msg: 'success', state: 200};
      return newState;
    case lost_page.failed:
      newState.lostItemPage.state = {msg: action.msg, state: 400};
      return newState;
    case add_lost_item.pending:
    case load_lost_item.pending:
      newState.openingLostItem.state = {msg: 'pending', state:100};
      newState.openingLostItem.lostItem = null;
      return newState;
    case add_lost_item.success:
    case load_lost_item.success:
    case close_lost_item.success:
      newState.openingLostItem.state = {msg: 'success', state: 200};
      newState.openingLostItem.lostItem = action.lostItem;
      return newState;
    case add_lost_item.failed:
    case load_lost_item.failed:
      newState.openingLostItem.state = {msg: action.msg, state: 400};
      newState.openingLostItem.lostItem = null;
      return newState;
    case close_lost_item.pending:
      newState.openingLostItem.state = {msg: 'pending', state: 100};
      return newState;
    case close_lost_item.failed:
      newState.openingLostItem.state = {msg: action.msg, state: 400};
      return newState;
    default:
      return state
  }
};

export default reducer;