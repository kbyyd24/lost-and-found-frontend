import User from './model/User'
import LostItem from './model/LostItem'

let user = new User();

let lostItems = [];

let lostItemPage = {
  state: {msg: null, state: 0},
  page: 1,
  listSize: 8,
  sort: 'createTime',
  lostItems
};

let lostItem = new LostItem();

let openingLostItem = {
  state: {msg: null, state: 0},
  lostItem
};

export default {user, lostItemPage, openingLostItem}